<!-- <script>
  import { onMount } from "svelte";
  import Pusher from "pusher-js";
  import { userName } from "../../stores";
  import axios from "axios";

  let messages = [];
  let inputMessage = "";

  onMount(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("f923b2a8f729fc995a83", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("educativ-io");
    channel.bind("message", (data) => {
      messages = [...messages, data];
    });
  });

    const sendMessage = async () => {
      await fetch("http://localhost:3000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          inputMessage,
        }),
      });
      inputMessage = "";
    };

  // const sendMessage = () => {
  //   const data = {
  //     userName: $userName,
  //     message: inputMessage,
  //   };
  //   axios.post("/api/messages", data);
  // };
</script>

<section class="container container-custom">
  <div>
    {#each messages as message}
      <div class="chat">
        <p>{message.message}</p>
        <p>{message.userName}</p>
      </div>
    {/each}
  </div>
  <form on:submit|preventDefault={sendMessage}>
    <div class="field">
      <div class="control">
        <input
          type="text"
          class="input"
          placeholder="Write your message..."
          bind:value={inputMessage}
        />
      </div>

      <div class="control">
        <input
          id="login-button"
          type="submit"
          class="button is-info is-light"
          value="Submit"
        />
      </div>
    </div>
  </form>
</section> -->
<script>
  import { onMount } from "svelte";
  import Pusher from "pusher-js";
  import { userName } from "../../stores";
  import axios from "axios";

  let joined = false;
  let username = "";
  let members = "";
  let newMessage = "";
  let messages = [];
  let status = "";

  onMount(() => {
    if (process.env.NODE_ENV !== "production") {
      Pusher.logToConsole = true;
    }

    const pusher = new Pusher("f923b2a8f729fc995a83", {
      cluster: "eu",
      encrypted: true,
      authEndpoint: "api/chat/pusher/auth",
    });

    function joinChat() {
      axios
        .post("api/chat/join-chat", { username: username })
        .then((response) => {
          // User has joined the chat
          joined = true;
          const channel = pusher.subscribe("presence-groupChat");
          channel.bind("pusher:subscription_succeeded", (members) => {
            members = channel.members;
          });
          // User joins chat
          channel.bind("pusher:member_added", (member) => {
            status = `${member.id} joined the chat`;
          });
          // Listen for chat messages
          listen();
        });
    }

    function sendMessage() {
      let message = {
        username: this.username,
        message: this.newMessage,
      };
      // Clear input field
      this.newMessage = "";
      axios.post("/send-message", message);
    }

    function listen() {
      const channel = pusher.subscribe("presence-groupChat");
      channel.bind("message_sent", (data) => {
        this.messages.push({
          username: data.username,
          message: data.message,
        });
      });
    }
  });

  // var channel = pusher.subscribe("my-channel");
  // channel.bind("my-event", function (data) {
  //   alert(JSON.stringify(data));
  // });
</script>

<h1>Chat</h1>
<p>
  Try publishing an event to channel <code>my-channel</code>
  with event name <code>my-event</code>.
</p>

<form on:submit|preventDefault={joinChat} class="form">
  <div class="field">
    <label for="" class="label">Username</label>
    <div class="control">
      <input type="text" placeholder="username" />
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
