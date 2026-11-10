// Only facts from veon/client.json (ids in comments). Nothing here is invented.
export const site = {
  name: "Somatica",
  phone: { text: "066 334 53 73", full: "+38 (066) 334 53 73", href: "tel:+380663345373" }, // C-003
  email: { text: "info@somatica.com.ua", href: "mailto:info@somatica.com.ua" }, // C-003
  address: {
    street: "просп. Валерія Лобановського, 17",
    floor: "7 поверх",
    metro: "поруч м. Деміївська",
    district: "Київ, Солом'янський район",
  }, // C-004
  hours: { days: "Понеділок — субота", time: "8:00–20:00", off: "Неділя — вихідний" }, // company.contacts.hours
  instagram: { href: "https://www.instagram.com/somatica_center/", handle: "@somatica_center" }, // socials[instagram]
  future: "Розділ у розробці",
} as const;
