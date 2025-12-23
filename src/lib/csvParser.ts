export interface Member {
  name: string
  role: string
  linkedIn?: string
  profileImage?: string
  email?: string
  category?: string
}

export type MemberCategory = 'Faculty' | 'Core Team' | 'Technical Team' | 'Events Team'

export interface CategorizedMembers {
  [key: string]: Member[]
}

export async function parseCSV(): Promise<Member[]> {
  try {
    const response = await fetch('/2.csv')
    const csvText = await response.text()
    
    const lines = csvText.split('\n')
    if (lines.length < 2) return []
    
    // Parse header
    const headers = lines[0].split(',').map(h => h.trim())
    const nameIndex = headers.findIndex(h => h.toLowerCase().includes('name'))
    const photoIndex = headers.findIndex(h => h.toLowerCase().includes('photograph'))
    const linkedInIndex = headers.findIndex(h => h.toLowerCase().includes('linked'))
    const postIndex = headers.findIndex(h => h.toLowerCase().includes('post'))
    const emailIndex = headers.findIndex(h => h.toLowerCase().includes('gmail'))
    
    const members: Member[] = []
    
    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      const values = parseCSVLine(line)
      
      let name = values[nameIndex]?.trim()
      const photoUrl = values[photoIndex]?.trim()
      let linkedInUrl = values[linkedInIndex]?.trim()
      const role = values[postIndex]?.trim()
      const email = values[emailIndex]?.trim()

      if (name) {
        // Clean name - remove newlines and extra whitespace
        name = name.replace(/\n/g, '').replace(/\s+/g, ' ').trim()

        // Clean LinkedIn URL - add https:// if missing and starts with www
        if (linkedInUrl && linkedInUrl.startsWith('www')) {
          linkedInUrl = 'https://' + linkedInUrl
        }

        members.push({
          name,
          role: role || 'Member',
          linkedIn: linkedInUrl && isValidUrl(linkedInUrl) ? linkedInUrl : undefined,
          profileImage: photoUrl && isValidImageUrl(photoUrl) ? photoUrl : undefined,
          email: email && email !== 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' ? email : undefined,
          category: categorizeRole(role)
        })
      }
    }
    
    return members
  } catch (error) {
    console.error('Error parsing CSV:', error)
    return []
  }
}

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
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

function isValidImageUrl(url: string): boolean {
  if (!url) return false
  if (url.startsWith('data:image/gif;base64')) return false
  if (url.includes('drive.google.com')) return false
  return isValidUrl(url)
}

function categorizeRole(role: string): MemberCategory {
  const roleLower = role?.toLowerCase() || ''
  
  // Faculty
  if (roleLower.includes('faculty') || roleLower.includes('head of department') || roleLower.includes('professor')) {
    return 'Faculty'
  }
  
  // Core Team (Leadership) - Convener, Executive, Co-
  if (roleLower.includes('convener') || roleLower.includes('executive')) {
    return 'Core Team'
  }
  
  // Technical Team
  if (roleLower.includes('technical') || roleLower.includes('backend') || roleLower.includes('website')) {
    return 'Technical Team'
  }
  
  // Events Team / General (everything else)
  return 'Events Team'
}

export function categorizeMembersData(members: Member[]): CategorizedMembers {
  const categorized: CategorizedMembers = {
    'Faculty': [],
    'Core Team': [],
    'Technical Team': [],
    'Events Team': []
  }
  
  members.forEach(member => {
    const category = member.category || 'Events Team'
    if (category in categorized) {
      categorized[category].push(member)
    }
  })
  
  return categorized
}
