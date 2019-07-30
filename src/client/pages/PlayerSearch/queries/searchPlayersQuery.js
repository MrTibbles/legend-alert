const query = ({ platformChoice, playerUserId }) => `
  query {
    searchPlayers(filter: { playerUserId: "${playerUserId}", platformSlug: "${platformChoice}"}) {
      platformSlug
      platformUserId
    }
  }
`;

export default query;
