export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string; // public/team/*.jpg
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Aiden Pinto", role: "Co-President", image: "/team/aiden.JPG" },
  { id: 2, name: "Luqman Bhatti", role: "Co-President", image: "/team/luqman.JPG" },
  { id: 3, name: "Mythili Panicker", role: "Logistics Co-Director", image: "/team/mythili.JPG" },
  { id: 4, name: "Sebastian Barsan", role: "Logistics Co-Director", image: "/team/sebastian.JPG" },
  { id: 5, name: "Darwin Zhang", role: "Logistics Executive", image: "/team/darwin.JPG" },
  { id: 6, name: "Evelyn Zou", role: "Logistics Executive", image: "/team/evelyn.JPG" },
  { id: 7, name: "Thomas Seoh", role: "Logistics Executive", image: "/team/thomas.JPG" },
  { id: 8, name: "Sumedh Panaskar", role: "Sponsorships Director", image: "/team/sumedh.JPG" },
  { id: 9, name: "Ali Naqvi", role: "Sponsorships Executive", image: "/team/ali.JPG" },
  { id: 10, name: "Ryan Si", role: "Sponsorships Executive", image: "/team/ryan.JPG" },
  { id: 11, name: "Jason Sun", role: "Sponsorships Executive", image: "/team/jason.JPG" },
  { id: 12, name: "Peter Shao", role: "Web Development Director", image: "/team/peter.JPG" },
  { id: 13, name: "Aahan Ghode", role: "Web Development Executive", image: "/team/aahan.JPG" },
  { id: 14, name: "Michelle Wang", role: "Promotions Director", image: "/team/michelle.JPG" },
  { id: 15, name: "Jerry Jiang", role: "Promotions Executive", image: "/team/jerry.JPG" },
  { id: 16, name: "Joyce Hong", role: "Promotions Executive", image: "/team/joyce.JPG" },
];
