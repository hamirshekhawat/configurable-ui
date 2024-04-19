# NiceForm

This README provides the instructions on how to install dependencies and start the NiceForm application.

## Installation

To install dependencies for frontend and backend, we will use a shell script that automates the process. 

### How to run the installation script

1. Navigate to the project root directory.
2. Check the `install.sh` file is present.
3. Make `install.sh` executable with the following command: `chmod +x install.sh`
4. Now, run the following command: `./install.sh`

The `install.sh` script will automatically navigate to the frontend and backend directories (i.e., `niceform` and `niceform_be` respectively), and run `npm install` in each.

## Running the Application

To start the application, you need to start both the `niceform_be` Express server and the `niceform` react app. 

### How to run the start script

1. Go back to the project root directory.
2. Check that the `run.sh` file is present.
3. Make the `run.sh` script executable with the following command: `chmod +x run.sh`
4. Now, run the following command: `./run.sh`

The `run.sh` script will start the backend server in the background first, it will then wait for 2 seconds before starting the frontend server. This delay ensures that the frontend is able to make requests to the backend server as soon as it starts.

## Stopping the Application

To stop the running applications at any time, use the `kill` command with the corresponding Process ID(s) (PID)s. You can find the PIDs by using the following commands:

```sh
ps ax | grep niceform_be 
ps ax | grep niceform
```

For each process, use the `kill` command with its PID to stop it:

```sh
kill -9 <PID>
```

You can also do:

```sh
kill -9 $(lsof -ti:3000,3001)
```

---

I hope this helps! Let me know if you have any questions.