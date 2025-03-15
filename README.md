# Node-RED JS Template Node

This project provides a custom Node-RED node called **JS Template**, which allows users to dynamically generate message properties using JavaScript template strings.

## Features

- Replace placeholders in a template string with evaluated JavaScript expressions.
- Configure the output property where the result will be stored (default: `payload`).

## Installation

To install this node into your Node-RED environment, navigate to your Node-RED user directory (usually `~/.node-red`) and run:

```bash
npm install <path-to-this-repository>
```

Restart Node-RED after installation.

## Usage

1. Drag the **JS Template** node into your Node-RED flow.
2. Configure the node:
   - **Name**: A custom name for the node.
   - **Template**: The JavaScript template string containing placeholders (e.g., `Hello, {{msg.name}}!`).
   - **Property**: The message property where the result will be stored (default: `payload`).
3. Connect the node to other nodes in your flow.
4. Inject a message with the required properties, and the node will replace placeholders with evaluated values.

### Example

If the template is `Hello, {{msg.name}}!` and the input message is:

```json
{
  "name": "Alice"
}
```

The output message will be:

```json
{
  "payload": "Hello, Alice!"
}
```

## Security Warning

This node uses `eval()` to evaluate JavaScript expressions. Be cautious when using this node with untrusted input, as it may introduce security vulnerabilities.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Support

For questions or issues, please open an issue in this repository.