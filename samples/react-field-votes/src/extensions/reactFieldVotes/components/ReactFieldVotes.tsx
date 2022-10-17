import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as React from "react";

import { SharePointService } from "../utils/SharePointService";
import styles from "./ReactFieldVotes.module.scss";

interface IReactFieldVotesProps {
  totalVoters: number;
  isVoted: boolean;
  sharePointService: SharePointService;
}

const ReactFieldVotes = (props: IReactFieldVotesProps) => {
  const [totalVoters, setTotalVoters] = React.useState(props.totalVoters);
  const [isVoted, setIsVoted] = React.useState(props.isVoted);

  async function onVote() {
    await props.sharePointService.addVote();
    setIsVoted(true);
    setTotalVoters((prevValue) => prevValue + 1);
  }

  async function onUnVote() {
    await props.sharePointService.removeVote();
    setIsVoted(false);
    setTotalVoters((prevValue) => prevValue - 1);
  }

  return (
    <div className={styles.reactFieldVotes}>
      <div>{totalVoters}</div>
      {isVoted ? (
        <button
          onClick={() => onUnVote()}
          className={styles.voted}
          type="button"
        >
          <Icon iconName="Like" />
          <span>Voted</span>
        </button>
      ) : (
        <button onClick={() => onVote()} type="button">
          <Icon iconName="LikeSolid" />
          <span>Vote</span>
        </button>
      )}
    </div>
  );
};

export { IReactFieldVotesProps, ReactFieldVotes };
