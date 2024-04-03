# Open-Twitch

Open-Twitch is a clone of Twitch, a live streaming platform, built using `Express.js` with `TypeScript`. It incorporates various technologies such as `Nginx`, `Docker`, `Jest` for testing, `Socket.io` for real-time chat, and `RTMP` for streaming.

## Setup

### Cloning the Repository

- Clone the repository:

    ```bash
    git clone https://github.com/Open-Twitch/Twitch-Server.git
    ```

## Running locally

**Without docker**

1. Provide environment variables based on the .env.example file.
2. Install dependencies:

```bash
npm install
```

3. Run the development server:
 ```bash
 npm run dev
```

4. Clone the RTMP microservice repository:
  ```bash
git clone https://github.com/Open-Twitch/rtmp-server
````

5. Navigate to the [RTMP](https://github.com/Open-Twitch/Twitch-Server) microservice directory and follow the same steps as above to set up and run the microservice.

**With docker**

1. Provide environment variables based on the .env.example file.
2. Make sure Docker is installed and running on your system.
3. Run the following command to start both the server and [RTMP](https://github.com/Open-Twitch/Twitch-Server) microservice using Docker Compose:

```bash
docker-compose up app
```

## API Documentation

-   For detailed documentation on the APIs and how they work, please refer to the [api-documentation.md](https://github.com/Open-Twitch/Twitch-Server/blob/master/api-dcumentation.md) file.

## Contributing

-   Contributions are welcomed! Feel free to submit pull requests, report issues, or suggest new features. This project is open-source under the MIT License.
