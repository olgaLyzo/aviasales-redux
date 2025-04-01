import { Ticket } from "../types/types";

export const fetchTickets = async (): Promise<Ticket[]> => {
	return[
		{
			id: 1,
			from: "SVO",
			to: "LED",
			company: "../../public/icons/Aeroflot.svg",
			price: 4500,
			currency: "RUB",
			time: {
				startTime: "14:00",
				endTime: "16:00"
			},
			duration: 120,
			date: "2024-12-10",
			connectionAmount: 2,
		},
		{
			id: 2,
			from: "DME",
			to: "LED",
			company: "../../public/icons/Ryanair.svg",
			price: 3200,
			currency: "RUB",
			time: {
				startTime: "15:30",
				endTime: "17:00"
			},
			duration: 90,
			date: "2024-12-11",
			connectionAmount: null,
		},
		{
			id: 3,
			from: "LCJ ",
			to: "ALC",
			company: "../../public/icons/S7airlines.svg",
			price: 4000,
			currency: "RUB",
			time: {
				startTime: "12:30",
				endTime: "15:00"
			},
			duration: 150,
			date: "2024-12-11",
			connectionAmount: null,
		},
		{
			id: 4,
			from: "SVO",
			to: "LED",
			company: "../../public/icons/Pobeda.svg",
			price: 2000,
			currency: "RUB",
			time: {
				startTime: "14:00",
				endTime: "16:00"
			},
			duration: 120,
			date: "2024-12-10",
			connectionAmount: 2,
		},
		{
			id: 5,
			from: "LCJ ",
			to: "ALC",
			company: "../../public/icons/Redwings.svg",
			price: 3000,
			currency: "RUB",
			time: {
				startTime: "12:30",
				endTime: "15:00"
			},
			duration: 150,
			date: "2024-12-11",
			connectionAmount: 1,
		},
		{
			id: 6,
			from: "SVO",
			to: "LED",
			company: "../../public/icons/Aeroflot.svg",
			price: 2300,
			currency: "RUB",
			time: {
				startTime: "12:00",
				endTime: "14:00"
			},
			duration: 120,
			date: "2024-12-08",
			connectionAmount: 0,
		},
		{
			id: 7,
			from: "SVO",
			to: "LED",
			company: "../../public/icons/Aeroflot.svg",
			price: 3500,
			currency: "RUB",
			time: {
				startTime: "19:00",
				endTime: "20:30"
			},
			duration: 90,
			date: "2024-12-10",
			connectionAmount: 1,
		},
		{
			id: 8,
			from: "DME",
			to: "LED",
			company: "../../public/icons/Ryanair.svg",
			price: 1000,
			currency: "RUB",
			time: {
				startTime: "15:00",
				endTime: "17:00"
			},
			duration: 120,
			date: "2024-12-11",
			connectionAmount: 1,
		},
		{
			id: 9,
			from: "DME",
			to: "LED",
			company: "../../public/icons/Ryanair.svg",
			price: 3000,
			currency: "RUB",
			time: {
				startTime: "11:30",
				endTime: "13:00"
			},
			duration: 90,
			date: "2024-12-10",
			connectionAmount: 2,
		},
		{
			id: 10,
			from: "LCJ ",
			to: "ALC",
			company: "../../public/icons/Redwings.svg",
			price: 2000,
			currency: "RUB",
			time: {
				startTime: "12:30",
				endTime: "15:00"
			},
			duration: 150,
			date: "2024-12-11",
			connectionAmount: 1,
		},
		{
			id: 11,
			from: "LCJ ",
			to: "ALC",
			company: "../../public/icons/Redwings.svg",
			price: 3000,
			currency: "RUB",
			time: {
				startTime: "12:30",
				endTime: "15:30"
			},
			duration: 350,
			date: "2024-12-10",
			connectionAmount: 1,
		},

	]
}