<script>
  import { onMount } from "svelte";
  import Pusher from "pusher-js";
  import { you } from "../../stores";
  import axios from "axios";

  $: members = "";
  $: newMessage = "";
  $: messages = [];
  $: status = "";

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
      const { data } = await axios.post("api/chat/join-chat", {
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
    });
  }
</script>

<h1>Group chats: {members}</h1>

<form on:submit|preventDefault={sendMessage} class="form">
  <div class="field">
    <label for="message" class="label">Message</label>
    <div class="control">
      <input
        type="text"
        name="message"
        placeholder="Your message..."
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

<div class="panel-body">
  {#if status}
    <p>{status}</p>
  {/if}
  <h1>Messages:</h1>
  {#each messages as message}
    <p>{message.username}</p>
    <p>{message.message}</p>
  {/each}
</div>

<style>
  .panel-body {
    overflow-y: scroll;
    height: 350px;
  }
</style>
