// Iconografia de marca: Phosphor Icons en peso Bold (brand guidelines).
// Esta capa expone los iconos con los nombres que ya usa la app (heredados de
// lucide) y normaliza props: { size, color, strokeWidth? } -> Phosphor bold.
// `pick` resuelve cada icono con fallbacks para tolerar diferencias de set.

import { ComponentType, createElement } from "react";
import * as P from "phosphor-react-native";

export type Icon = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type PhosphorProps = { size?: number; color?: string; weight?: string };

const registry = P as unknown as Record<string, ComponentType<PhosphorProps>>;

const pick = (...names: string[]): Icon => {
  const Resolved = names.map((name) => registry[name]).find(Boolean) ?? registry.Circle!;
  const GlyphComponent: Icon = ({ size = 24, color = "#1E1E1E" }) =>
    createElement(Resolved, { size, color, weight: "bold" });
  return GlyphComponent;
};

// Navegacion y acciones basicas
export const ArrowLeft = pick("ArrowLeft");
export const ArrowUpRight = pick("ArrowUpRight");
export const ChevronDown = pick("CaretDown");
export const ChevronLeft = pick("CaretLeft");
export const ChevronRight = pick("CaretRight");
export const ChevronUp = pick("CaretUp");
export const Check = pick("Check");
export const CheckCheck = pick("Checks", "Check");
export const CheckCircle2 = pick("CheckCircle", "Check");
export const X = pick("X");
export const Plus = pick("Plus");
export const Minus = pick("Minus");
export const Menu = pick("List");
export const Search = pick("MagnifyingGlass");
export const ArrowDownAZ = pick("SortAscending", "FunnelSimple");
export const Pencil = pick("PencilSimple", "Pencil");
export const Trash2 = pick("Trash");
export const Save = pick("FloppyDisk");
export const Send = pick("PaperPlaneRight", "PaperPlaneTilt");
export const Download = pick("DownloadSimple");
export const Upload = pick("UploadSimple");
export const ExternalLink = pick("ArrowSquareOut");
export const RotateCcw = pick("ArrowCounterClockwise");
export const Eye = pick("Eye");
export const EyeOff = pick("EyeSlash");
export const Play = pick("Play");
export const Pause = pick("Pause");
export const Square = pick("Stop", "Square");
export const Mic = pick("Microphone");
export const Camera = pick("Camera");
export const Paperclip = pick("Paperclip");
export const Copy = pick("Copy", "Copy");

// Estado y avisos
export const AlertTriangle = pick("Warning");
export const Bell = pick("Bell");
export const BellOff = pick("BellSlash");
export const Lock = pick("Lock");
export const LockKeyhole = pick("LockKey", "Lock");
export const KeyRound = pick("Key");
export const ShieldCheck = pick("ShieldCheck");
export const Shield = pick("Shield");
export const ShieldAlert = pick("ShieldWarning");
export const HelpCircle = pick("Question");
export const LifeBuoy = pick("Lifebuoy");
export const WifiOff = pick("WifiSlash");
export const Wifi = pick("WifiHigh");
export const Signal = pick("CellSignalHigh", "WifiHigh");
export const Sparkles = pick("Sparkle");
export const Lightbulb = pick("Lightbulb");

// Personas y comunicacion
export const UserRound = pick("User");
export const Users = pick("Users");
export const Contact = pick("IdentificationCard");
export const MessageCircle = pick("ChatCircle");
export const MessageSquarePlus = pick("ChatCircleText", "ChatCircle");
export const MessageSquareX = pick("ChatCircleSlash", "ChatCircle");
export const MessagesSquare = pick("ChatsCircle", "ChatCircle");
export const Megaphone = pick("Megaphone");
export const Phone = pick("Phone");
export const Mail = pick("EnvelopeSimple");
export const Heart = pick("Heart");
export const HeartHandshake = pick("HandHeart", "Heart");
export const HeartPulse = pick("Heartbeat");
export const Handshake = pick("Handshake");
export const PartyPopper = pick("Confetti");
export const Cake = pick("Cake");
export const Medal = pick("Medal");
export const Award = pick("Certificate", "Medal");
export const Star = pick("Star");
export const Target = pick("Target", "CrosshairSimple");
export const Smile = pick("Smiley");
export const Laugh = pick("SmileyWink", "Smiley");
export const Meh = pick("SmileyMeh");
export const Frown = pick("SmileySad");
export const Angry = pick("SmileyAngry", "SmileySad");

// Finanzas
export const Wallet = pick("Wallet");
export const PiggyBank = pick("PiggyBank");
export const Banknote = pick("Money");
export const CreditCard = pick("CreditCard");
export const Landmark = pick("Bank");
export const Receipt = pick("Receipt");
export const ReceiptText = pick("Receipt");
export const PieChart = pick("ChartPie");
export const BarChart3 = pick("ChartBar");
export const LineChart = pick("ChartLine");
export const Tags = pick("Tag");
export const Ticket = pick("Ticket");
export const Smartphone = pick("DeviceMobile");

// Documentos y archivos
export const FileText = pick("FileText");
export const FileDown = pick("FileArrowDown");
export const FileCheck2 = pick("Signature", "FileText");
export const FileSignature = pick("PenNib", "Signature");
export const FileQuestion = pick("FileDashed", "File");
export const FileImage = pick("FileImage", "Image");
export const FileMusic = pick("FileAudio", "MusicNote");
export const FileSpreadsheet = pick("FileXls", "Table");
export const FileVideo = pick("FileVideo", "VideoCamera");
export const FolderOpen = pick("FolderOpen");
export const Newspaper = pick("Newspaper");
export const Presentation = pick("Presentation", "ProjectorScreenChart");
export const ClipboardCheck = pick("Clipboard", "ClipboardText");
export const ClipboardList = pick("ListChecks", "ClipboardText");
export const BookOpen = pick("BookOpen");
export const Image = pick("Image");
export const Video = pick("VideoCamera");
export const Clapperboard = pick("FilmSlate");

// Calendario y tiempo
export const CalendarCheck = pick("CalendarCheck");
export const CalendarDays = pick("CalendarBlank", "Calendar");
export const CalendarRange = pick("CalendarDots", "Calendar");

// Operacion
export const GraduationCap = pick("GraduationCap");
export const Rocket = pick("RocketLaunch", "Rocket");
export const HardHat = pick("HardHat");
export const Briefcase = pick("Briefcase");
export const Building2 = pick("Buildings");
export const Settings = pick("GearSix", "Gear");
export const LogIn = pick("SignIn");
export const LogOut = pick("SignOut");
export const MapPin = pick("MapPin");
export const Car = pick("Car");
export const Tv = pick("Television");
export const Droplets = pick("Drop");
export const Dumbbell = pick("Barbell");
export const Brain = pick("Brain");
export const Scale = pick("Scales");
export const Ban = pick("Prohibit");
export const GitMerge = pick("GitMerge");
export const RefreshCw = pick("ArrowsClockwise");
export const ShoppingBag = pick("ShoppingBag");
export const UtensilsCrossed = pick("ForkKnife");
