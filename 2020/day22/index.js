import getInput from "../../util/getInput.js";

const playerMap = {
	player1: "player2",
	player2: "player1",
};

const getPlayerCards = (input) => {
	const separatorIndex = input.indexOf("");
	const player1 = input.slice(1, separatorIndex);
	const player2 = input.slice(separatorIndex + 2);

	return {
		player1: player1.map(Number),
		player2: player2.map(Number),
	};
};

const moveCards = (cards, winner) => {
	const loser = playerMap[winner];
	const winnerCard = cards[winner].shift();
	const loserCard = cards[loser].shift();

	cards[winner].push(winnerCard, loserCard);

	return cards;
};

const setCache = (cache, cards) => {
	const cardString = [...cards.player1, "x", ...cards.player2].join("");

	if (cache.has(cardString)) {
		return false;
	} else {
		return cache.add(cardString);
	}
};

const playRound = (cards, recursive = false, cardCache = new Set()) => {
	let winner;

	if (!cards.player1.length || !cards.player2.length) {
		return cards.player1.length ? "player1" : "player2";
	}

	if (recursive) {
		cardCache = setCache(cardCache, cards);

		if (cardCache === false) {
			return "player1";
		}
	}

	const [player1, player2] = [cards.player1[0], cards.player2[0]];

	if (
		recursive &&
		cards.player1.length > player1 &&
		cards.player2.length > player2
	) {
		const cardsCopy = {
			player1: cards.player1.slice(1, player1 + 1),
			player2: cards.player2.slice(1, player2 + 1),
		};

		winner = playRound(cardsCopy, true);
	} else {
		winner = player1 > player2 ? "player1" : "player2";
	}

	cards = moveCards(cards, winner);

	return playRound(cards, recursive, cardCache);
};

const calculateScore = (cards) => {
	let score = 0;

	cards.reverse().forEach((value, index) => {
		score += value * (index + 1);
	});

	return score;
};

const playGame = (input, recursive = false) => {
	const cards = getPlayerCards(input);
	const winner = playRound(cards, recursive);

	return calculateScore(cards[winner]);
};

export const part1 = (input) => playGame(input);

export const part2 = (input) => playGame(input, true);

const input = getInput(import.meta.url);

console.log("--DAY 22--");
console.log("PART 1", part1(input));
console.log("PART 2", part2(input));
