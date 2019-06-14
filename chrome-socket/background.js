"use strict";
var config = { 
  socketHost  : "http://localhost:1234",
  badgeColor  : '#FF0000'
}
var socket = io.connect(config.socketHost);


// Start listning to server
socket.on('connect', () => {
  const userId = socket.id;
  console.log('Chrome connected Server', config.socketHost);
  socket.on(`init-${userId}`, (data)=>{
    console.log('init data', data);
    let logs = data.logs;
    // Show the notification 
    showNotifications(logs);
  });

  // When new movie released dispaly
  socket.on("event_logs", (data) => {
    console.info('event_logs ::',data);
    showNotifications(data)      
  });
});

function showNotifications(logs) {
  for (let index = 0; index < logs.length; index++) {
    const log = logs[index];
    chrome.notifications.create(
      ('name-for-sd'+Date.now()),{   
        type: 'basic', 
        iconUrl: "48.png",
        title: log.title, 
        message: log.body
      });
    console.log('log',log.body, log.title);
  }
}