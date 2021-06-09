<script>
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

  //   const sendMessage = async () => {
  //     await fetch("http://localhost:3000/api/messages", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         userName,
  //         inputMessage,
  //       }),
  //     });
  //     inputMessage = "";
  //   };

  const sendMessage = () => {
    const data = {
      userName: $userName,
      message: inputMessage,
    };
    axios.post("/api/messages", data);
  };
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
</section>
