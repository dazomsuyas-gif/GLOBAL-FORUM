export interface OwnerInfo {
    name: string;
    foundingYear: number;
    address: string;
    whatsapp: string[];
    emails: string[];
    admin: {
        email: string;
        password: string;
    };
}

export const OWNER_INFO: OwnerInfo = {
    name: 'Msuya Kelvin Juma',
    foundingYear: 2026,
    address: 'Arusha, Tanzania',
    whatsapp: ['+255768868546', '+255767456512'],
    emails: ['dazomsuyas@gmail.com', 'kelvinmsuya27@gmail.com'],
    admin: {
        email: 'dazomsuyas@gmail.com',
        password: '@Kelvin1998'
    }
};
