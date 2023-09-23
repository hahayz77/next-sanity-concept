# ✅Sanity step by step

‌

1. Install NextJS -> `npx create-next-app@latest`
2. Install Sanity → `npm create sanity@latest`
   1. Atention on say No to app directory on sanity installation
3. Allow CORS origin on [https://www.sanity.io/manage](https://www.sanity.io/manage "‌")
4. Change `.env` to `.env.local`, and configure the `dataset` and `projectID`
5. Add images next.config file
   1. ```javascript
      // next.config.ts

      /** @type {import('next').NextConfig} */
      const nextConfig = {};

      module.exports = {
        images: {
          remotePatterns: [
            {
              protocol: "https",
              hostname: "cdn.sanity.io",
              port: "",
            },
          ],
        },
      };
      ```
6. Create a Schema on`sanity/schemas/`
   1. ```javascript
      export default {
        name: 'pet',
        type: 'document',
        title: 'Pet',
        fields: [
          {
            name: 'name',
            type: 'string',
            title: 'Name'
          },
          {
            name: 'image',
            type: 'image',
            title: 'Image',
            options: { hotspot: true  }
          }
        ]
      }
      ```
7. Add on schema.js
   1. ```javascript
      import pet from './pet'

      export const schemaTypes = [pet]
      ```
8. Create content on `/studio`
9. Fetch the content
   1. ```javascript
      import { client } from '../../sanity/lib/client';

      ...

      export async function getStaticProps() {
        const pet = await client.fetch(`*[_type == "pet"]`);
        //console.log(pet);

        return {
          props: { pet }
        }
      }
      ```
10. Remember to fetch the first array after pass the object to the component
    1. ```javascript
       const Pet = ({pet}) => {

           const { _id, name, image } = pet[0];
       ...
       }
       ```
11. ❗To use images you need to use this method urlForImage().url()
    1. ```javascript
       import { urlForImage } from '../../sanity/lib/image';
       ...
       <Image src={urlForImage(image).url()} alt={name} width={400} height={400} />
       ...
       ```
       ‌

# 🔰Important examples of schemas:

‌

- Document with nested array of object images

```javascript
export default {
    title: 'Featured',
    name: 'featured',
    type: 'document',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
            description: "Title of the featured",
            validation: (Rule) => Rule.required()
        },
        {
            name: 'images',
            type: 'array',
            title: 'Images',
            description: "Upload 7 pictures and links",
            of: [
                {
                    type: 'object',
                    name: 'imageWithDescription',
                    title: 'Image with Description',
                    fields: [
                        {
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            options: { hotspot: true },
                            validation: (Rule) => Rule.required()
                        },
                        {
                            name: 'link',
                            type: 'string',
                            title: 'Link',
                            description: "Link url",
                            validation: (Rule) => Rule.required()
                        },
                    ]
                }
            ],
            validation: (Rule) => Rule.required().min(7).max(7).error('You must provide 7 images.')
        },
    ],
}
```