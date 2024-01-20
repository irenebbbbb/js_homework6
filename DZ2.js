const company = {
    name: 'Велика Компанія',
    type: 'Головна компанія',
    platform: 'Платформа для продажу квитків',
    sellsSolution: 'Рішення для продажу квитків',
    clients: [
        {
            name: 'Клієнт 1',
            type: 'subCompany',
            uses: 'ПО для продажу квитків',
            sells: 'Рішення для продажу квитків',
            partners: [
                {
                    name: 'Клієнт 1.1',
                    type: 'subSubCompany',
                    uses: 'Рішення для продажу квитків',
                    sells: 'Рішення для продажу квитків',
                },
                {
                    name: 'Клієнт 1.2',
                    type: 'subSubCompany',
                    uses: 'Рішення для продажу квитків',
                    sells: 'Рішення для продажу квитків',
                    partners: [
                        {
                            name: 'Клієнт 1.2.3',
                            type: 'subSubCompany',
                            uses: 'Рішення для продажу квитків',
                            sells: 'Рішення для продажу квитків',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Клієнт 2',
            type: 'subCompany',
            uses: 'ПО для продажу квитків',
            sells: 'Рішення для продажу квитків'
        }
    ]
};

function findValueByKey(companyName, company) {
    if (company.name === companyName) {
        return company;
    }

    if (company.clients && company.clients.length > 0) {
        for (const client of company.clients) {
            if (client.type === 'subCompany' || client.type === 'subSubCompany') {
                const foundCompany = findValueByKey(companyName, client);
                if (foundCompany) {
                    return foundCompany;
                }

                if (client.partners && client.partners.length > 0) {
                    for (const partner of client.partners) {
                        if (partner.type === 'subCompany' || partner.type === 'subSubCompany') {
                            const foundCompany = findValueByKey(companyName, partner);
                            if (foundCompany) {
                                return foundCompany;
                            }

                            if (partner.partners && partner.partners.length > 0) {
                                for (const partner2 of partner.partners) {
                                    if (partner2.type === 'subCompany' || partner2.type === 'subSubCompany') {
                                        const foundCompany = findValueByKey(companyName, partner2);
                                        if (foundCompany) {
                                            return foundCompany;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return null;
}

let companyNameToFind = prompt('Введіть назву дочірньої компанії, яку хочете знайти');
const foundCompany = findValueByKey(companyNameToFind, company);

if (foundCompany) {
    console.log(`Знайдено наступну інформацію про дочірню компанію "${companyNameToFind}":`, foundCompany);
} else {
    console.log(`Дочірня компанія "${companyNameToFind}" не знайдена.`);
}