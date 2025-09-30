import {
  ArrowRight,
  Award,
  Bitcoin,
  Building,
  CheckCircle,
  ChevronUp,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  Loader2,
  LucideProps,
  Menu,
  Play,
  PlugZap,
  Power,
  Shield,
  Store,
  Target,
  TrendingUp,
  Unplug,
  Users,
  Wallet,
  X,
} from "lucide-react"

type IconSize = { size?: number }
type SvgProps = React.HTMLAttributes<SVGElement>
type IconProps = IconSize & SvgProps & LucideProps

export const Icons = {
  x: (props: IconProps) => <X {...props} />,
  arrowRight: (props: IconProps) => <ArrowRight {...props} />,
  shield: (props: IconProps) => <Shield {...props} />,
  bitcoin: (props: IconProps) => <Bitcoin {...props} />,
  building: (props: IconProps) => <Building {...props} />,
  users: (props: IconProps) => <Users {...props} />,
  trendingUp: (props: IconProps) => <TrendingUp {...props} />,
  clock: (props: IconProps) => <Clock {...props} />,
  checkCircle: (props: IconProps) => <CheckCircle {...props} />,
  play: (props: IconProps) => <Play {...props} />,
  download: (props: IconProps) => <Download {...props} />,
  award: (props: IconProps) => <Award {...props} />,
  target: (props: IconProps) => <Target {...props} />,
  dollarSign: (props: IconProps) => <DollarSign {...props} />,
  menu: (props: IconProps) => <Menu {...props} />,
  chevronUp: (props: IconProps) => <ChevronUp {...props} />,
  externalLink: (props: IconProps) => <ExternalLink {...props} />,
  wallet: (props: IconProps) => <Wallet {...props} />,
  plug: (props: IconProps) => <PlugZap {...props} />,
  unplug: (props: IconProps) => <Unplug {...props} />,
  store: (props: IconProps) => <Store {...props} />,
  power: (props: IconProps) => <Power {...props} />,
  spinner: (props: IconProps) => (
    <Loader2 {...props} className="animate-spin" />
  ),
} as const

export type TIconName = keyof typeof Icons
