export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string; // public/team/*.jpg
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Luqman Bhatti", role: "Co-President", image: "/team/luqman.JPG" },
  { id: 2, name: "Mythili Panicker", role: "Logistics Co-Director", image: "/team/mythili.JPG" },
  { id: 3, name: "Sebastian Barsan", role: "Logistics Co-Director", image: "/team/sebastian.JPG" },
  { id: 4, name: "Darwin Zhang", role: "Logistics Executive", image: "/team/darwin.JPG" },
  { id: 5, name: "Evelyn Zou", role: "Logistics Executive", image: "/team/evelyn.JPG" },
  { id: 6, name: "Jason Sun", role: "Sponsorships Executive", image: "/team/jason.JPG" },
  { id: 7, name: "Joyce Hong", role: "Promotions Executive", image: "/team/joyce.JPG" },
];
