import React from "react";
import { COLORS } from "../../index";

interface CellStatusProps {
	text: string;
}

export default function CellStatus({ text }: CellStatusProps) {
	return <td style={{ color: COLORS[text] }}>{text}</td>;
}

