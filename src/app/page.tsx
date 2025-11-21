import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  Truck,
  FileText,
  MessageSquare,
  MapPin,
  CheckCircle2,
  Clock,
  Wrench,
} from "lucide-react"

const kpis = [
  {
    label: "Active Work Zones",
    value: "7",
    trend: "+2 today",
    badge: "Live",
  },
  {
    label: "Open DVIRs",
    value: "14",
    trend: "3 need review",
    badge: "Inspections",
  },
  {
    label: "Crew On Shift",
    value: "22",
    trend: "4 crews deployed",
    badge: "Field",
  },
  {
    label: "Safety Alerts",
    value: "3",
    trend: "1 critical",
    badge: "Risk",
  },
]

const workZones = [
  {
    id: "WZ-2401",
    route: "I-81 SB",
    location: "MP 138–141",
    status: "Active",
    window: "09:00–15:00",
    trafficControl: "Lane closure",
    risk: "High",
  },
  {
    id: "WZ-2402",
    route: "US-460",
    location: "Orange Ave – 10th St",
    status: "Planned",
    window: "Tonight 22:00",
    trafficControl: "Flagging",
    risk: "Medium",
  },
  {
    id: "WZ-2403",
    route: "Peters Creek Rd",
    location: "NW Roanoke",
    status: "Active",
    window: "All day",
    trafficControl: "Shoulder",
    risk: "Low",
  },
]

const alerts = [
  {
    type: "Critical",
    title: "Missing post-trip DVIR",
    message: "Vehicle #112 left site without completed post-trip inspection.",
    time: "12 min ago",
  },
  {
    type: "Warning",
    title: "Expiring certification",
    message: "2 flaggers have certifications expiring within 30 days.",
    time: "Today • 07:45",
  },
  {
    type: "Info",
    title: "New work zone template",
    message: "VDOT lane closure template added to library.",
    time: "Yesterday",
  },
]

const quickActions = [
  {
    icon: ClipboardList,
    label: "Start DVIR",
    description: "Pre / post trip inspection",
    href: "/dvir",
  },
  {
    icon: MapPin,
    label: "Create Work Zone",
    description: "Define limits, hours & TCP",
    href: "/workzones",
  },
  {
    icon: FileText,
    label: "Log Daily Report",
    description: "MUTCD + internal notes",
    href: "/reports",
  },
  {
    icon: MessageSquare,
    label: "Crew Messages",
    description: "Broadcast to field teams",
    href: "/messages",
  },
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Top shell */}
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
              {/* Header */}
              <header className="flex flex-col gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-3">
                  <LayoutDashboard className="h-6 w-6" />
                  <div>
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <p className="text-sm text-slate-300">Overview of operations</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded bg-slate-800 px-3 py-1 text-sm">New Work Zone</button>
                  <button className="rounded bg-slate-700 px-3 py-1 text-sm">Settings</button>
                </div>
              </header>
      
              {/* Content placeholder */}
              <section className="pt-6">
                <p className="text-sm text-slate-300">Content goes here.</p>
              </section>
            </div>
          </main>
        )
      }
