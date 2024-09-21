import axios from "axios";

export default class FeedService {
  getPosts(page) {
    return axios.get(
      `https://graph.facebook.com/v20.0/${page.id}/published_posts?fields=id,likes,message,full_picture&access_token=${page.accessToken}`
    );
  }

  getPageName(page) {
    return axios.get(
      `https://graph.facebook.com/v20.0/me?fields=id,name,picture&access_token=${page.accessToken}`
    );
  }
}
