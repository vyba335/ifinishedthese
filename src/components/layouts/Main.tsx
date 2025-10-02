import React from "react";
import HeroTitle from "../ui/HeroTitle";
import GameCardGrid from "../ui/GameCardGrid";

const Main = () => {

    return (
        <main>
            <HeroTitle title="I Finished These!" subtitle="Save your finished games, write review for them and share your list!" />
            <GameCardGrid />
        </main>
    );
};

export default Main;
