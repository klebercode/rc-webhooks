class Script {
  process_incoming_request({ request }) {
    return {
      content:{
        text: `${request.content.message} ${request.content.primary_resources[0].name} ${request.content.primary_resources[0].url}`,
        "attachments": [{
           "fields": [{
             "short": true
           }]
        }]
      }
    }
  }
}
