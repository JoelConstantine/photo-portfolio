interface Error {
	status?: number;
}

interface IPhoto {
	getAll();
	findByID(id);
	findInList(idList);
}