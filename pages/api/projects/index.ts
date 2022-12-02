import { NextApiRequest, NextApiResponse } from "next";

export default function projects(req: NextApiRequest, res: NextApiResponse) {
	const DATA = [
		{
			project: { id: 1 },
			cells: [
				{ text: "piybeep", type: "text" },
				{ text: "https://piybeep.com", type: "link" },
				{ text: "2022.01.10 12:32", type: "date" },
				{ text: "В разработке", type: "enum" },
			],
		},
		{
			project: { id: 2 },
			cells: [
				{ text: "IKT54", type: "text" },
				{ text: "https://ikt54.ru", type: "link" },
				{ text: "2022.11.15 12:32", type: "date" },
				{ text: "Поддержка", type: "enum" },
			],
		},
		{
			project: { id: 3 },
			cells: [
				{ text: "Gate 2025", type: "text" },
				{ text: "http://176.57.208.229", type: "link" },
				{ text: "2022.08.20 12:32:10", type: "date" },
				{ text: "Завершено", type: "enum" },
			],
		},
	];
	switch (req.method) {
		case "GET": {
			res.status(200).json(DATA);
		}
		default: {
			res.status(404).end();
		}
	}
}
