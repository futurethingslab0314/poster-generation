
import { PosterData, NotionSettings } from '../types';

/**
 * Mocks the Notion API interaction.
 * In a real production app, this would use the Notion SDK or fetch() 
 * to talk to a backend proxy (to avoid CORS/leaking keys).
 */
export async function syncToNotion(
  data: PosterData, 
  settings: NotionSettings,
  imageUrl: string
): Promise<boolean> {
  if (!settings.apiKey || !settings.databaseId) return false;

  console.log('Syncing to Notion with data:', {
    parent: { database_id: settings.databaseId },
    properties: {
      Title: { title: [{ text: { content: data.title } }] },
      Speaker: { rich_text: [{ text: { content: data.speakerName } }] },
      Date: { date: { start: data.eventDate } },
      Location: { select: { name: data.location } },
    }
  });

  // Simulating a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real scenario, we'd send the image to a storage bucket first 
      // as Notion doesn't accept base64 strings directly in its properties.
      console.log('Success! Data pushed to Notion ID:', settings.databaseId);
      resolve(true);
    }, 1500);
  });
}
