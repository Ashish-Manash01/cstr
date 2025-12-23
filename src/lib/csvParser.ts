export interface Member {
  name: string
  role: string
  linkedIn?: string
  profileImage?: string
  email?: string
  category?: MemberCategory
}

export type MemberCategory =
  | 'Faculty'
  | 'Core Team'
  | 'Technical Team'
  | 'Website Team'
  | 'Executive Team'
  | 'Events Team'

export interface CategorizedMembers {
  [key: string]: Member[]
}

/* =========================================================
   MANUAL TEAM OVERRIDES (HIGHEST PRIORITY)
   ========================================================= */

const MANUAL_TEAM_MAP: Record<string, MemberCategory> = {
  // Core Team
  'nishant patil': 'Core Team',
  'janumpally sushanth reddy': 'Core Team',
  'rashmi k. murthy': 'Core Team',

  // Technical Team
  'harsh pratap singh': 'Technical Team',
  'aditya kumar': 'Technical Team',
  'akanksha sagar kulkarni': 'Technical Team',

  // Website Team
  'ashish manash': 'Website Team',
  'bendi hema swaroop': 'Website Team',
  'm lakshmi padmavathi': 'Website Team',

  // Executive Team
    // Executive Team
  'neha ojha sikhwal': 'Executive Team',
  'b sai eswar': 'Executive Team',
  'gowtham b m': 'Executive Team',
  'tejas s': 'Executive Team'
}

/* =========================================================
   CSV PARSER
   ========================================================= */

export async function parseCSV(): Promise<Member[]> {
  try {
    const response = await fetch('/2.csv')
    const csvText = await response.text()

    const lines = csvText.split('\n')
    if (lines.length < 2) return []

    // Remove BOM + normalize headers
    const headers = lines[0]
      .replace(/\uFEFF/g, '')
      .split(',')
      .map(h => h.trim().toLowerCase())

    const nameIndex = headers.findIndex(h => h.includes('name'))
    const photoIndex = headers.findIndex(h => h.includes('image'))
    const linkedInIndex = headers.findIndex(h => h.includes('linkedin'))
    const emailIndex = headers.findIndex(h => h.includes('email'))
    const roleIndex = headers.findIndex(h => h.includes('role'))

    const members: Member[] = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = parseCSVLine(line)

      const name = values[nameIndex]
        ?.replace(/\s+/g, ' ')
        .trim()

      if (!name) continue

      const rawRole = values[roleIndex]
        ?.replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      const role = rawRole && rawRole.length > 0 ? rawRole : 'Member'

      const linkedInRaw = values[linkedInIndex]?.trim()
      const linkedIn =
        linkedInRaw && linkedInRaw.startsWith('http')
          ? linkedInRaw
          : undefined

      const photoRaw = values[photoIndex]?.trim()
      const profileImage =
        photoRaw && isValidImageUrl(photoRaw)
          ? photoRaw
          : undefined

      const emailRaw = values[emailIndex]?.trim()
      const email =
        emailRaw && emailRaw.includes('@')
          ? emailRaw
          : undefined

      const category = categorizeRole(role, name)

      members.push({
        name,
        role,
        linkedIn,
        profileImage,
        email,
        category
      })
    }

    return members
  } catch (error) {
    console.error('Error parsing CSV:', error)
    return []
  }
}

/* =========================================================
   HELPERS
   ========================================================= */

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let insideQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (char === ',' && !insideQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}

function isValidImageUrl(url: string): boolean {
  if (!url) return false
  if (url.startsWith('data:image')) return false
  if (url.includes('drive.google.com')) return false
  return isValidUrl(url)
}

/* =========================================================
   CATEGORY LOGIC
   ========================================================= */

function categorizeRole(role: string, name?: string): MemberCategory {
  const cleanName = name?.toLowerCase().trim() || ''

  // 🔥 MANUAL OVERRIDE (HIGHEST PRIORITY)
  if (cleanName && MANUAL_TEAM_MAP[cleanName]) {
    return MANUAL_TEAM_MAP[cleanName]
  }

  const r = role.toLowerCase().replace(/\s+/g, ' ').trim()

  // Faculty
  if (
    r.includes('faculty') ||
    r.includes('advisor') ||
    r.includes('professor') ||
    r.includes('head of department') ||
    r.includes('hod')
  ) {
    return 'Faculty'
  }

  // Core Team (fallback)
  if (r.includes('convener') || r.includes('executive')) {
    return 'Core Team'
  }

  // Technical Team (fallback)
  if (
    r.includes('technical') ||
    r.includes('backend') ||
    r.includes('website') ||
    r.includes('web')
  ) {
    return 'Technical Team'
  }

  return 'Events Team'
}

/* =========================================================
   GROUPING FOR UI
   ========================================================= */

export function categorizeMembersData(
  members: Member[]
): CategorizedMembers {
  const categorized: CategorizedMembers = {
    Faculty: [],
    'Core Team': [],
    'Technical Team': [],
    'Website Team': [],
    'Executive Team': [],
    'Events Team': []
  }

  members.forEach(member => {
    categorized[member.category || 'Events Team'].push(member)
  })

  return categorized
}
