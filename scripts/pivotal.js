class Script {
  process_incoming_request({ request }) {
    const data = request.content;
    try {
      return {
        content:{
          text: `${data.message} ${data.primary_resources[0].name}\n${data.primary_resources[0].url}`,
        }
      };
    } catch (e) {
      console.log('pivotalevent error', e);
      return {
        error: {
          success: false,
          message: `${e.message || e} ${JSON.stringify(data)}`
        }
      };
    }
  }
}
