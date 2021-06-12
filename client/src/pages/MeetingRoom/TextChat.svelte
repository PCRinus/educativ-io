<script>
  import { onMount } from "svelte";
  import Pusher from "pusher-js";
  import { you } from "../../stores";
  import axios from "axios";
  import moment from "moment";

  $: members = "";
  $: newMessage = "";
  $: messages = [];
  $: status = "";
  let objectValues = [];

  onMount(() => {
    if (process.env.NODE_ENV !== "production") {
      Pusher.logToConsole = true;
    }
    joinChat();
  });

  const pusher = new Pusher("f923b2a8f729fc995a83", {
    cluster: "eu",
    encrypted: true,
    authEndpoint: "api/chat/pusher/auth",
  });

  async function joinChat() {
    try {
      await axios.post("api/chat/join-chat", {
        username: $you,
      });
      // Current user has joined the chat
      const channel = pusher.subscribe("presence-groupChat");
      channel.bind("pusher:subscription_succeeded", (members) => {
        members = channel.members.data;
      });
      // Other user joins chat
      channel.bind("pusher:member_added", (member) => {
        status = `${member.id} joined the chat`;
      });
      //User leaves channel
      channel.bind("pusher:member_removed", (member) => {
        status = `${member.id} left the chat`;
      });
      // Listen for chat messages
      listen();
    } catch (error) {
      console.error(error);
    }
  }

  function sendMessage() {
    let message = {
      username: $you,
      message: newMessage,
    };
    newMessage = "";
    axios.post("api/chat/send-message", message);
  }

  function listen() {
    const channel = pusher.subscribe("presence-groupChat");
    channel.bind("message_sent", (data) => {
      messages.push({
        username: data.username,
        message: data.message,
      });
      console.log("Messages: " + JSON.stringify(messages));
      console.log(typeof messages);
      console.log(messages.length);
      console.log(Object.values(messages));
      objectValues = Object.values(messages);
    });
  }
</script>

<h1>Messages:</h1>
{#if status}
  <p>{status}</p>
{/if}
<div class="panel-body">
  {#each objectValues as message}
    <div class="message">
      <p class="username">
        <b>{message.username}</b> <i>{moment().format("h:mm")}</i>
      </p>
      <p>{message.message}</p>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage} class="form">
  <div class="field">
    <label for="message" class="label">Message</label>
    <div class="control">
      <input
        type="text"
        name="message"
        placeholder="Your message..."
        class="input"
        bind:value={newMessage}
      />
    </div>
  </div>

  <div class="control">
    <input
      id="login-button"
      type="submit"
      class="button is-info is-light"
      value="Submit"
    />
  </div>
</form>

<style>
  .panel-body {
    overflow-y: scroll;
    height: 350px;
    border: solid 1px #b5b5b5;
    border-radius: 5px;
  }

  .message {
    padding: 0rem 1rem;
  }
/* 
  .username {
    font-weight: 700;
  } */
</style>
