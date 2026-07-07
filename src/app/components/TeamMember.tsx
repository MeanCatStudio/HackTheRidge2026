export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Luqman Bhatti", role: "President", image: "/team/luqman.JPG" },
  { id: 2, name: "Mythili Panicker", role: "Logistics Co-Director", image: "/team/mythili.JPG" },
  { id: 3, name: "Sebastian Barsan", role: "Logistics Co-Director", image: "/team/sebastian.JPG" },
  { id: 4, name: "Evelyn Zou", role: "Logistics Executive", image: "/team/evelyn.JPG" },
  { id: 5, name: "Jason Sun", role: "Sponsorships Executive", image: "/team/jason.JPG" },
  { id: 6, name: "Joyce Hong", role: "Promotions Executive", image: "/team/joyce.JPG" },
];
