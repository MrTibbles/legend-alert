interface InputArgs {
  platformChoice: string;
  playerUserId: string;
}

const query = ({ platformChoice, playerUserId }: InputArgs): string => `
  query {
    searchPlayers(filter: { playerUserId: "${playerUserId}", platformSlug: "${platformChoice}"}) {
      platformSlug
      platformUserId
    }
  }
`;

export default query;
