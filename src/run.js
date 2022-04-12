const fetch = require('node-fetch');
//const fsLibrary = require('fs/promises');

(async () => {

	console.log("Starting");

	const response = await fetch('https://serre.grainesdesol.fr/wp-json/buddypress/v1/members/?per_page=5&type=alphabetical&page=1');

	const rawEntrepreneurs = await response.json();

	//	await fsLibrary.writeFile("./raw.json", JSON.stringify(rawEntrepreneurs));

	const silverEntrepreneurs = rawEntrepreneurs.map(entrepreneur => {
		const infosEntrepreneur = entrepreneur.xprofile.groups.filter(group => group.id == 1)[0].fields;
		//console.log(infosEntrepreneur);
		return infosEntrepreneur;
	});

	//	await fsLibrary.writeFile("./silver.json", JSON.stringify(silverEntrepreneurs));

	silverEntrepreneurs.map(entrepreneur => {

		//		console.log(entrepreneur);

		let goldEntrepreneur = {};

		for (const key in entrepreneur) {
			if (Object.hasOwnProperty.call(entrepreneur, key)) {
				const element = entrepreneur[key];
				console.log(element);
				switch (element.id) {
					case 1:
						goldEntrepreneur.completeName = element.value.raw
						break;
					case 12:
						goldEntrepreneur.sector = element.value.raw
						break;
					case 13:
						goldEntrepreneur.job = element.value.raw
						break;
					case 14:
						goldEntrepreneur.commercialName = element.value.raw
						break;
					case 20:
						goldEntrepreneur.telephone = element.value.raw
						break;
					case 21:
						goldEntrepreneur.offer = element.value.raw
						break;
					case 23:
						goldEntrepreneur.email = element.value.raw
						break;
					case 25:
						goldEntrepreneur.website = element.value.raw
						break;
					case 151:
						goldEntrepreneur.description = element.value.rendered
						break;
					case 175:
						goldEntrepreneur.firstName = element.value.raw
						break;
					case 176:
						goldEntrepreneur.lastName = element.value.raw
						break;

					default:
						break;
				}
			}
		}

		//console.log(`Do we have a first name here? : ${realEntrepreneurFirstNameData.value.raw}`)

		const entrepreneurFirstNameData = entrepreneur[0];
		const entrepreneurLastNameData = entrepreneur[1];
		// const entrepreneurFirstLastNameData = entrepreneur[2];

		// const entrepreneurMailData = entrepreneur[8];
		// const entrepreneurTelephoneData = entrepreneur[9];
		// const entrepreneurSiteData = entrepreneur[10];
		// const entrepreneurOffreData = entrepreneur[12];
		// const entrepreneurDescriptionData = entrepreneur[15];
		// const entrepreneurIsGdsData = entrepreneur[16];
		// const entrepreneurIsAzelarData = entrepreneur[17];


		console.log(`RETRIEVED INFOS : ${JSON.stringify(goldEntrepreneur)}`);

		// console.log(`entrepreneurMailData - ${entrepreneurMailData.value.raw}`);
		// console.log(`entrepreneurTelephoneData - ${entrepreneurTelephoneData.value.raw}`);
		// console.log(`entrepreneurSiteData - ${entrepreneurSiteData.value.raw}`);
		// console.log(`entrepreneurOffreData - ${entrepreneurOffreData.value.raw}`);
		// console.log(`entrepreneurDescriptionData - ${entrepreneurDescriptionData.value.raw}`);
		// console.log(`entrepreneurIsGdsData - ${entrepreneurIsGdsData.value.raw}`);
		// console.log(`entrepreneurIsAzelarData - ${entrepreneurIsAzelarData.value.raw}`);


		console.log(`------`);


	});


})();