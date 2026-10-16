export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  accent: string;
  nightAccent: string;
  isRoleCard?: boolean;
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Luqman Bhatti", role: "President", image: "/2026team/optimized/luqman.jpeg", accent: "#d94f3d", nightAccent: "#f08a72" },
  { id: 2, name: "Thomas Seoh", role: "Co-President", image: "/2026team/optimized/thomas.jpeg", accent: "#d94f3d", nightAccent: "#f08a72" },
  { id: 3, name: "Sebastian Barsan", role: "Logistics Executive", image: "/2026team/optimized/sebastian.jpeg", accent: "#1677a8", nightAccent: "#78b7d4" },
  { id: 4, name: "Mythili Panicker", role: "Logistics Executive", image: "/2026team/optimized/mythili.jpeg", accent: "#1677a8", nightAccent: "#78b7d4" },
  { id: 5, name: "Oscar Liu", role: "Logistics Executive", image: "/2026team/optimized/oscar.jpeg", accent: "#1677a8", nightAccent: "#78b7d4", isRoleCard: true },
  { id: 6, name: "Hussain Baqri", role: "Sponsorships Executive", image: "/2026team/optimized/hussain.jpeg", accent: "#b87500", nightAccent: "#e8bc69", isRoleCard: true },
  { id: 7, name: "Amaan Zakir Hussain", role: "Sponsorships Executive", image: "/2026team/optimized/amaan.jpeg", accent: "#b87500", nightAccent: "#e8bc69", isRoleCard: true },
  { id: 8, name: "Atharv Mahajan", role: "Web Dev Executive", image: "/2026team/optimized/atharv.jpeg", accent: "#218a52", nightAccent: "#83c69a" },
  { id: 9, name: "Ekansh Bansal", role: "Web Dev Executive", image: "/2026team/optimized/ekansh.jpeg", accent: "#218a52", nightAccent: "#83c69a", isRoleCard: true },
  { id: 10, name: "Waylon", role: "Web Dev Executive", image: "/2026team/optimized/waylon.jpeg", accent: "#218a52", nightAccent: "#83c69a", isRoleCard: true },
  { id: 11, name: "Evelyn Zou", role: "Promotions Executive", image: "/2026team/optimized/evelyn.jpeg", accent: "#8b3fb5", nightAccent: "#c79bd8" },
  { id: 12, name: "Siqi Tan", role: "Promotions Executive", image: "/2026team/optimized/siqi.jpeg", accent: "#8b3fb5", nightAccent: "#c79bd8", isRoleCard: true },
  { id: 13, name: "Angelina Li", role: "Promotions Executive", image: "/2026team/optimized/angelina.jpeg", accent: "#8b3fb5", nightAccent: "#c79bd8", isRoleCard: true },
  { id: 14, name: "Evan Xu", role: "Promotions Executive", image: "/2026team/optimized/evan.jpeg", accent: "#8b3fb5", nightAccent: "#c79bd8", isRoleCard: true },
  { id: 15, name: "Ryan El Khatib", role: "Promotions Executive", image: "/2026team/optimized/ryan.jpeg", accent: "#8b3fb5", nightAccent: "#c79bd8", isRoleCard: true },
];
