## Route 1: POST api/auth/register

### Description

This route is responsible for registering a new user by creating a new user document in the database. It validates the input data, checks for existing users with the same email, and generates a JWT token upon successful registration.

### Request

The request body should contain the following fields:

-   `username`: The desired username for the new user.
-   `email`: The unique email address for the new user.
-   `password`: The password for the new user.

### Response

The response includes a success message and a JWT token, which is stored in a cookie for future authentication.

## Route 2: POST api/auth/login

### Description

This route is responsible for authenticating a user by checking the provided credentials against the database. It validates the input data, checks for existing users, and generates a JWT token upon successful authentication.

### Request

The request body should contain the following fields:

-   `username`: The username of the user attempting to log in.
-   `password`: The password provided by the user.

### Response

The response includes a success message and a JWT token, which is stored in a cookie for future authentication. If the credentials are invalid, an error message is returned.

## Route 3: POST api/channels

### Description

This route is responsible for following a channel by adding the channel ID to a user's followedChannels array in the database. It validates the input data, checks for existing users and followed channels, and updates the user document accordingly.

## Request

The request should include the user's authentication token inside cookie or header to identify the user.
The request body should contain the following fields:

-   `channelId`: The ID of the channel to follow.

## Response

The response includes a success message.

## Error Handling

The route handles errors by returning appropriate HTTP status codes and error messages. For example, if the user is not found or the channel is already being followed, a 404 status code and an error message will be returned.

## Route 4: GET api/channels/:channelId

### Description

This route is responsible for retrieving a single channel's details from the database. It validates the provided channel ID, checks for the channel's activity, and returns the channel's details along with the username of the user who created the channel.

### Request

The request URL should contain the channel ID as a parameter.

### Response

The response includes the channel's details, the username of the user who created the channel, and additional metadata such as the channel's online status and stream URL.

### Error Handling

The route handles errors by returning appropriate HTTP status codes and error messages. For example, if the channel is not found or the user is not found, a 404 status code and an error message will be returned.

### Route 5: GET api/channels

## Description

This route is responsible for retrieving all active channels from the database. It fetches the details of each active channel, including the channel ID, title, and avatar URL. Additionally, it retrieves the username of the user who created each channel.

## Response

The response includes an array of channel objects, each containing the channel details, the username of the channel creator, and metadata such as the channel's online status.

## Error Handling

The route handles errors by returning appropriate HTTP status codes and error messages. If no active channels are found, a 404 status code and an error message will be returned.

## Route 5: GET api/channels

### Description

This route is responsible for retrieving all active channels from the database. It fetches the details of each active channel, including the channel ID, title, and avatar URL. Additionally, it retrieves the username of the user who created each channel.

### Response

The response includes an array of channel objects, each containing the channel details, the username of the channel creator, and metadata such as the channel's online status.

### Error Handling

The route handles errors by returning appropriate HTTP status codes and error messages. If no active channels are found, a 404 status code and an error message will be returned.

## Route 6: GET api/channels-follow

### Description

This route is responsible for retrieving the channels that a user is following. It fetches the list of followed channels for the authenticated user from the database.

### Request

The request should include the user's authentication token inside cookie or header to identify the user.

### Response

The response includes an array of followed channels belonging to the user.

### Error Handling

The route handles errors by returning appropriate HTTP status codes and error messages. If the user is not found, a 404 status code and an error message will be returned.

## Route 7: GET api/settings

### Description

This route is responsible for retrieving the settings of the user's channel. It fetches the channel settings, including the channel ID, username, title, description, avatar URL, and stream key, from the database.

### Request

The request should include the user's authentication token inside cookie or header to identify the user.

### Response

The response includes the settings of the user's channel, such as the channel ID, username, title, description, avatar URL, and stream key.

### Error Handling

The route handles errors by returning appropriate HTTP status codes and error messages. If the user or channel settings are not found, a 404 status code and an error message will be returned.

## Route 8: PUT api/settings

### Description

This route is responsible for updating the settings of the user's channel. It allows users to modify their channel details, such as username, description, title, and avatar URL, in the database.

### Request

The request should include the user's authentication token inside cookie or header to identify the user.
The request body should contain the following fields to update the channel settings:

-   `username`: The new username for the channel.
-   `description`: The updated description of the channel.
-   `title`: The new title for the channel.
-   `avatarURL`: The new avatar URL for the channel.

### Response

The response includes the updated channel settings, such as the channel's title, description, avatar URL, and status.

### Error Handling

The route handles errors by returning appropriate HTTP status codes and error messages. If the user or channel settings are not found, a 404 status code and an error message will be returned.

## Route 9: PATCH api/settings/password

### Description

This route is responsible for updating the user's password. It allows users to change their password by providing the current password and a new password, which will be encrypted and stored securely in the database.

### Request

The request should include the user's authentication token inside cookie or header to identify the user.
The request body should contain the following fields to update the password:

-   `password`: The current password for authentication.
-   `newPassword`: The new password to be set.

### Response

The response includes a success message confirming the password change and the updated user data.

### Error Handling

The route handles errors by returning appropriate HTTP status codes and error messages. If the user is not found, the current password is incorrect, or there are any other issues, appropriate error messages will be returned.
