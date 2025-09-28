export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string; // public/team/*.jpg
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Aiden Pinto", role: "Co-President", image: "/team/aiden.jpg" },
  { id: 2, name: "Luqman Bhatti", role: "Co-President", image: "/team/luqman.jpg" },
  { id: 3, name: "Mythili Panicker", role: "Logistics Co-Director", image: "/team/mythili.jpg" },
  { id: 4, name: "Sebastian Barsan", role: "Logistics Co-Director", image: "/team/sebastian.jpg" },
  { id: 5, name: "Darwin Zhang", role: "Logistics Executive", image: "/team/darwin.jpg" },
  { id: 6, name: "Evelyn Zou", role: "Logistics Executive", image: "/team/evelyn.jpg" },
  { id: 7, name: "Thomas Seoh", role: "Logistics Executive", image: "/team/thomas.jpg" },
  { id: 8, name: "Sumedh Panaskar", role: "Sponsorships Director", image: "/team/sumedh.jpg" },
  { id: 9, name: "Ali Naqvi", role: "Sponsorships Executive", image: "/team/ali.jpg" },
  { id: 10, name: "Ryan Si", role: "Sponsorships Executive", image: "/team/ryan.jpg" },
  { id: 11, name: "Jason Sun", role: "Sponsorships Executive", image: "/team/jason.jpg" },
  { id: 12, name: "Peter Shao", role: "Web Development Director", image: "/team/peter.jpg" },
  { id: 13, name: "Aahan Ghode", role: "Web Development Executive", image: "/team/aahan.jpg" },
  { id: 14, name: "Michelle Wang", role: "Promotions Director", image: "/team/michelle.jpg" },
  { id: 15, name: "Jerry Jiang", role: "Promotions Executive", image: "/team/jerry.jpg" },
  { id: 16, name: "Joyce Hong", role: "Promotions Executive", image: "/team/joyce.jpg" },
];