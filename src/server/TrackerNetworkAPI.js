const { RESTDataSource } = require("apollo-datasource-rest");

class TrackerNetworkAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = "https://public-api.tracker.gg";
  }

  willSendRequest(request) {
    request.headers.set("TRN-Api-Key", this.context.token);
  }

  async searchPlayers({ platformSlug, playerUserId }) {
    try {
      const { data } = await this.get(
        `/v2/apex/standard/search?platform=${platformSlug}&query=${playerUserId}`
      );

      // Handle error responses from TRN API
      return data;
    } catch (error) {
      this.handleErrorResponse(error);
    }
  }

  handleErrorResponse(errors) {
    console.log(`TrackerNetworkAPI :: handleErrorResponse ::`);
    console.log(errors);
  }
  //
  // async getMostViewedMovies(limit = 10) {
  //   const data = await this.get('movies', {
  //     per_page: limit,
  //     order_by: 'most_viewed',
  //   });
  //   return data.results;
  // }
}

module.exports = TrackerNetworkAPI;
