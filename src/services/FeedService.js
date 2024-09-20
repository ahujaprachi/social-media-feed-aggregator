import axios from "axios";

export default class FeedService {
  getPosts() {
    return axios.get(
      "https://graph.facebook.com/v20.0/449664138223225/posts?fields=likes,full_picture&access_token=EAAcEH1XCZB1cBO2YP2d3apgUmrkZAK3wZAfDhg2s8ZB7SWzVb4ZCeutAeUioyWuxyJo3VqDuPyy0J5X9vpBUjSbSMnhT50kqc0kZAamTZCjwFBdAzaMbOubH20SQWfZAJZBBfGhgLiCqftJvUDZBc6cPPu1CTjRuafZC3njJWUjRIuAsNr0AowjxHcOWN33rhlbCqXCfRmOrqtZBzC2egjvO0ZAGkmZASM"
    );
  }
}
