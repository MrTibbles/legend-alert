const { RESTDataSource } = require("apollo-datasource-rest");

class TrackerNetworkAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = "https://public-api.tracker.gg";
  }

  willSendRequest(request) {
    request.headers.set("TRN-Api-Key", this.context.token);
  }

  /**
   * Search for an Apex Legends player
   *
   * @param  {String}  platformSlug Platform identifier for player; 'psn', 'xbl', 'origin'
   * @param  {String}  playerUserId Player's handle
   * @return {Promise}              Returns standard Graphql response
   */
  async searchPlayers({ platformSlug, playerUserId }) {
    try {
      const { data } = await this.get(
        `/v2/apex/standard/search?platform=${platformSlug}&query=${playerUserId}`
      );

      if (!data) this.logErrorResponse("Tracker Network null response");

      return data;
    } catch (error) {
      this.logErrorResponse(error);

      return error;
    }
  }

  /**
   * Get an Apex Legends player's profile stats
   *
   * @param  {String}  platformSlug     Platform identifier for player; 'psn', 'xbl', 'origin'
   * @param  {String}  playerUserId     Player's handle
   * @param  {String}  [segmentsFilter] Type of segments to filter by
   * @return {Promise}                  Returns standard Graphql response
   */
  async playerStats({ platformSlug, playerUserId, segmentsFilter }) {
    try {
      const { data } = await this.get(
        `/v2/apex/standard/profile/${platformSlug}/${playerUserId}`
      );

      if (!data) {
        this.logErrorResponse("Tracker Network null response");

        return null;
      }

      const filteredSegements = segmentsFilter
        ? data.segments.reduce((filtered, segment) => {
            if (segment.type === segmentsFilter) filtered.push(segment);

            return filtered;
          }, [])
        : data.segments;

      return Object.assign({}, { ...data }, { segments: filteredSegements });
    } catch (error) {
      this.logErrorResponse(error);

      return error;
    }
  }

  /**
   * Basic error logging
   *
   * @param  {Object}   errors Error object
   * @return {Function}        Logs the returned error to stdout
   */
  logErrorResponse(errors) {
    const timestamp = new Date();

    console.log(
      `TrackerNetworkAPI :: ErrorResponse :: ${timestamp.toISOString()}`
    );
    console.log(errors);
  }
}

module.exports = TrackerNetworkAPI;
