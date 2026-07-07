export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  isRoleCard?: boolean;
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Luqman Bhatti", role: "President", image: "/team/luqman.JPG" },
  { id: 2, name: "Mythili Panicker", role: "Logistics Executive", image: "/team/mythili.JPG" },
  { id: 3, name: "Sebastian Barsan", role: "Logistics Executive", image: "/team/sebastian.JPG" },
  { id: 4, name: "Evelyn Zou", role: "Logistics Executive", image: "/team/evelyn.JPG" },
  { id: 5, name: "Jason Sun", role: "Sponsorships Executive", image: "/team/jason.JPG" },
  { id: 6, name: "Joyce Hong", role: "Promotions Executive", image: "/team/joyce.JPG" },
  { id: 7, name: "Web Development Executive", role: "", image: "/team/circuit-web.svg", isRoleCard: true },
  { id: 8, name: "Design Executive", role: "", image: "/team/circuit-design.svg", isRoleCard: true },
  { id: 9, name: "Finance Executive", role: "", image: "/team/circuit-finance.svg", isRoleCard: true },
  { id: 10, name: "Outreach Executive", role: "", image: "/team/circuit-outreach.svg", isRoleCard: true },
  { id: 11, name: "Events Executive", role: "", image: "/team/circuit-events.svg", isRoleCard: true },
  { id: 12, name: "Volunteer Executive", role: "", image: "/team/circuit-volunteer.svg", isRoleCard: true },
];
