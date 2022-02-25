let socket = io("https://fanuc-ws-server-albert.herokuapp.com/", {withCredentials: false});

socket.on("joint_values", (joint_values)=>{
    console.log(joint_values);
})