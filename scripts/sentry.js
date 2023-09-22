class Script {
  process_incoming_request({request}) {
    var data = request.content.data
    var event = ""
    var project = ""
    var title = ""
    var culprit = ""
    var issue_url = ""

    if ("event" in data) {
      event = data.event
      project = event.project
      title = event.title
      culprit = event.culprit
      issue_url = event.web_url
    }

    if ("issue" in data) {
      issue = data.issue
      title = issue.title
      culprit = issue.culprit
      project = `${issue.project.slug} (${issue.project.id})`
      issue_url = `https://ow7.sentry.io/issues/${issue.id}/`
    }

    return {
      content: {
        text: `Error in project *${project}*\n*Title:* ${title}\n*Culprit*: ${culprit}\n*Issue:* ${issue_url}`
      }
    }
  }
}
