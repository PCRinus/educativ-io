<script>
  import marked from "marked";

  let codeBlock = marked(`
\`\`\`
code block
\`\`\`
`);

  let inlineCode = marked(`\`inline code\``);

  let quotedText = marked(`> quoted text`);
</script>

<table>
  <tbody>
    <tr>
      <td># Header <br /> ... <br /> ###### Header</td>
      <td>H1 header <br /> ... <br /> H6 Header</td>
    </tr>
    <tr>
      <td>*italics* or _italics_</td>
      <td><i>italics</i></td>
    </tr>
    <tr>
      <td>**bold**</td>
      <td><strong>bold</strong></td>
    </tr>
    <tr>
      <td>[Link](https://...)</td>
      <td><a href="https://google.com" target="_blank">Link</a></td>
    </tr>
    <tr>
      <td>* item 1 <br /> * item 2</td>
      <td
        ><ul>
          <li>item 1</li>
          <li>item 2</li>
        </ul></td
      >
    </tr>
    <tr>
      <td>1. item 1 <br /> 2. item 2</td>
      <td
        ><ol>
          <li>item 1</li>
          <li>item 2</li>
        </ol></td
      >
    </tr>
    <tr>
      <td>> quoted text</td>
      <td>{@html quotedText}</td>
    </tr>
    <tr>
      <td>`inline code`</td>
      <td>{@html inlineCode}</td>
    </tr>
    <tr>
      <td>``` <br /> code block <br />```</td>
      <td>{@html codeBlock}</td>
    </tr>
  </tbody>
</table>

<style>
  ul,
  ol {
    margin-top: 0rem !important;
  }
</style>
