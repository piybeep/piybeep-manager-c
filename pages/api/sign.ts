import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	msg?: string;
	error?: any;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	if (req.method === "POST") {
		try {
			const { email, password } = req.body;

			if (email !== "admin@piybeep.com" || password !== "adminPB") {
				res.status(400).send({ error: "Неверная почта или пароль" });
				return;
			}

			res.status(200).json({ msg: "ok" });
		} catch (error) {
			console.error("[api]", error);
			res.status(500).send({ error: "Произошла ошибка сервера" });
		}
	} else {
		res.status(404).end();
	}
}
