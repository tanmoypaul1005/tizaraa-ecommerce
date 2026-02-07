export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  inStock: boolean;
  stockQuantity: number;
  images: ProductImage[];
  variants: ProductVariants;
  specifications: Specification[];
  createdAt?: string;
  popularity?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  type: 'image' | 'video';
}

export interface ProductVariants {
  colors: Variant[];
  materials: Variant[];
  sizes: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  value: string;
  available: boolean;
  hex?: string;
  priceModifier?: number;
  images?: ProductImage[];
}

export interface Specification {
  label: string;
  value: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '01',
    name: 'Designer Custom Hoodie',
    slug: 'designer-hoodie',
    shortDescription: 'Premium heavyweight hoodie with customizable design options.',
    description: 'Stay warm and stylish with our designer custom hoodie. Features premium heavyweight fabric, adjustable drawstrings, and spacious kangaroo pocket. Perfect for layering or standalone wear.',
    basePrice: 129.99,
    compareAtPrice: 159.99,
    rating: 4.9,
    reviewCount: 892,
    category: 'Apparel',
    tags: ['premium', 'winter', 'customizable'],
    inStock: true,
    stockQuantity: 78,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop', alt: 'Hoodie front', type: 'image' },
      { id: '1', url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop', alt: 'Hoodie back', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800&h=800&fit=crop', alt: 'Hoodie detail', type: 'image' },
    ],
    variants: {
      colors: [
        { 
          id: 'black', 
          name: 'Black', 
          value: 'black', 
          hex: '#000000', 
          available: true,
          priceModifier: 0,
          images: [
            { id: 'b1', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop', alt: 'Black Hoodie', type: 'image' },
          ]
        },
        { 
          id: 'gray', 
          name: 'Gray', 
          value: 'gray', 
          hex: '#6B7280', 
          available: true,
          priceModifier: 15,
          images: [
            { id: 'g1', url: 'data:image/jpeg;base64,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', alt: 'Gray Hoodie', type: 'image' },
          ]
        },
        { 
          id: 'navy', 
          name: 'Navy', 
          value: 'navy', 
          hex: '#1E3A8A', 
          available: true,
          priceModifier: 25,
          images: [
            { id: 'n1', url: 'data:image/jpeg;base64,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', alt: 'Navy Hoodie', type: 'image' },
          ]
        },
      ],
      materials: [
        { id: 'cotton', name: '80/20 Cotton Blend', value: 'cotton', available: true },
        { id: 'fleece', name: 'Premium Fleece', value: 'fleece', available: true, priceModifier: 15 },
      ],
      sizes: [
        { id: 's', name: 'Small', value: 'S', available: true, priceModifier: 0 },
        { id: 'm', name: 'Medium', value: 'M', available: true, priceModifier: 10 },
        { id: 'l', name: 'Large', value: 'L', available: true, priceModifier: 20 },
        { id: 'xl', name: 'Extra Large', value: 'XL', available: true, priceModifier: 30 },
      ],
    },
    specifications: [
      { label: 'Material', value: '80% Cotton, 20% Polyester' },
      { label: 'Weight', value: '400 GSM' },
      { label: 'Features', value: 'Adjustable Hood, Kangaroo Pocket' },
    ],
  },
  {
    id: '02',
    name: 'Personalized Phone Case',
    slug: 'phone-case',
    shortDescription: 'Durable custom phone case with premium protection.',
    description: 'Protect your device in style with our personalized phone case. Features military-grade drop protection, wireless charging compatibility, and customizable designs.',
    basePrice: 34.99,
    rating: 4.7,
    reviewCount: 2341,
    category: 'Accessories',
    tags: ['tech', 'protective', 'customizable'],
    inStock: true,
    stockQuantity: 234,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=800&fit=crop', alt: 'Phone case', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=800&fit=crop', alt: 'Case on phone', type: 'image' },
    ],
    variants: {
      colors: [
        { 
          id: 'clear', 
          name: 'Clear', 
          value: 'clear', 
          hex: '#FFFFFF', 
          available: true,
          priceModifier: 0,
          images: [
            { id: 'c1', url: 'data:image/jpeg;base64,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', alt: 'Clear Phone Case', type: 'image' },
          ]
        },
        { 
          id: 'black', 
          name: 'Black', 
          value: 'black', 
          hex: '#000000', 
          available: true,
          priceModifier: 10,
          images: [
            { id: 'b1', url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=800&fit=crop', alt: 'Black Phone Case', type: 'image' },
          ]
        },
        { 
          id: 'blue', 
          name: 'Blue', 
          value: 'blue', 
          hex: '#3B82F6', 
          available: true,
          priceModifier: 17,
          images: [
            { id: 'bl1', url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQEhUTERISFRUVFhUTFRIVFRAYFhUTGBYWFhUXFhUYHSggGBolGxUVITEhJSktLi4uFx8zODMsNygtLysBCgoKDg0OGhAQGy4iHyUtLSsyLy0vLy0rLy0tLS0tLS8tNS0vLTUtLS8tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABwIDBAUGCAH/xABIEAACAQIDBAYECAwEBwAAAAAAAQIDEQQSIQUxQVEHEyJhcZEGMoGhJHJ0sbPB0dIUFyMzNEJSU1SS4fBigpOyCBUWY2Rzg//EABoBAQADAQEBAAAAAAAAAAAAAAADBAUCAQb/xAAqEQEAAgICAQIFAwUAAAAAAAAAAQIDEQQSITFBEyNRgfAiM7EFFBUyUv/aAAwDAQACEQMRAD8AnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADXbW27hcIk8TiKNK+5VJxi34Ju79hpekn0iqYDCN0LdfVfV0r27LteVSz0eVLzcb6Hnyqq1WpKUp1JzatKcs8pSl+02/W4+RZxcftWb2nUIr5NW6x5l6GXSJsr+Mp+VX7p9XSBsvd+F0/wCWr9086ug1d31inJvJuS3t28ba8zDdWLd+tt7P6nXTj/8AUut3+j07D022c1dYqHtVRd/FGPPpD2VFtPGQTWjTjVTT7046Hm2eJVklVi96trq205N827JeEUuBfrYaSpxm9Y7ovfa2mXuty3EmLjY8sz1s5tl6a7e70WukTZX8ZT/lq/dPv4wtlfxlP+Wr908zxmy6psljgV+svLZdPSf4wdl/xdP+Wr90pl0i7JW/GU/Kr9083OTMetcT/T6x7yUy9perdkekuCxbthsTRqy35Izi5pc3D1l5G1PG1OclJNNpxaakm04tbmpLVPvPR3RJ6T1cbhnCvLPVotLrH61Sm12ZS/xJpp+Ce9srZuLNI7R5hLNoidO7ABUegAAAAAAAAAAAAAAAAAAAACKOm+hKc8JZNpRxDsubdHW3sOH9GMZTwtVSqZktXJxScrSWlk9OFvad102Yx0qmEtbWNfer7nR+0iXaGKnKWa2V279d+uvA1cWKMvG6/nqo3tavI37G3arnKo4erKo5tbrxzOUU78NVv4pcrmjxqlNrLC3lbct2plVsTV4NeUfsMZ4qpzX8sfsK/wDZ3j3XomJ8kFeMYSSi7+taF1e2ZyavKVrJpLdrzNhUxbUVTTdld25X599kjDp152buvKPPwKqMSzxuPbHbtMoskVmNSvUo3MynQPmFp3NzQwbabSeiu3y4mrSnhkZ8/wCrUNRKgWKlM6CthbcC1gNnOrUVNWvO8eHHc7b9HZ+zge5KxEbcYc0zbTmZQ1JU6DJyWMnG+jw0213qrRt878zhdsbJeGqOE32otpxSvZ3ejl6vdo278DuuhFfDp/Jqn0tAocj9m0x9GlF92rCbwAYS6AAAAAAAAAAAAAAAAAAAAAIz6YMeqM8NeDk3Gtb1VudLe2m+PAizauDqV3Cqslp04ttyikpK+be72RKvTCqV8L1sHK/W2cfWSSi2ld2s3a9+SscRHBU1eCTy2codpy7ErXe5Wvppfh57nB84o+7L5VuuRx+M2dky9pSUle63XTaaXPxNfWwx3dbZeaNrR0d45Vok1qufA1lbZLd47pLdykuGvB+OnuvbmsaRU5N6y5SMOHP+0V0lZmy2lsuVFN1E09yVnzfafKPLm7rgzVylf7SrlzVxRv1X67u22B3nXbM2j1dOVOyfWaa8F+s/L32I+w9dwad21dJp/UdDQxFvEs8bkVz11r0ZfKw3w37N1jJq2iRqK2MlHc7LktE/Hm+97hVxd+JrsRWuWr60rY4tNtqMdXdRqUnd2Sbe+6Vr377J+LZIvQkvhs/k0/paJGOYk3oSl8Nmv/GqfS0TO5WvhW006RbvVNgAMBqAAAAAAAAAAAAAAAAAAAAACNel+F54Rf8Au+aBy+HmrRWVXjFRvdvTwOq6XHaphP8A7/NA43DVdbLwN3+nxvD92RzJ1l+zc0cKpL6zB2hh1StNu+V23atS0y+F8uvBLwLtDHW4mq29tFOLV+Xzos9Z2itaOrSelG1HiZflWnKKyxnZbloovkrJWa773Vrcsovk34a+42GMq3bNfUdyvyOPW9eseF3iXtrcq4wVry0V9zTTfHiZEcTc085NPUrp1rHHHpGGJ0tZsPxI8ttKuWpz7zDVW5VSk27XLM32rxx4qv5iTugz9On8mqfS0SLqertyTdr3d1f7PeSh0Gv4dP5LU+loFbkz8qzqI1aE5AAxFsAAAAAAAAAAAAAAAAAAAAARp0xO8sKkrztVce3CKa7CkrPWT1ja3fvOHoYapGMpuMkoqWsk42cssYKV90lmnL/Jpe6v1/TlWyrDK0Netd3G7VslrPl2ndcdORH9D0rqUcN1MXaE81TKo09ykqcXlcciebrna1rRje+rexxMlowxFfqz8/Hi+TcreJxzhp2l4pq/sZqsXjbptssVq0ZXbgoLXtQclF9+Sd3fwaXca3E4i+7dwL85fCDFw4my9VqXPmWK1m3rqoxtmtwbb0j733GJQn2knuurru4lVGnOu52aclFzy8Z2azKK4uzbtyTIJu0oxdfHsuxWGm7N1abe6by1I/5lGMWl4X8DHxmFnSllna9k007xlF6xlF8YtcSj8Gn+y/bZe5m2nRc8JBz0lSquEL75U5pSsuaUlJ+1kepl32is+J8NPFXMmlC3Hfx4+BedBRWiFODbSSbb0SSu2+SXFkvTr6uJyxaPCiEGndPXv1JS6DJp7QqLK18FqPfp+doblbTzI7eDcfWlCL/Zu2145E7eDsSP0H0msfPd+i1FdWa/O0OJDyY+VKOt4m0JxABiLIAAAAAAAAAAAAAAAAAAAAAijp3h2cNKyaj1qfaineWS1lve57txDdSq3qoJJJRTk1ayVtL28fayXOnmP5TBtq6jTxLtzeagkvMhyTcnd6mxw41iiVbJEWsprRm9ZbuG5r2W0LMqPeZMJ2+tcGu8pqKz+bweqLUva2mPDCs4tPk7o2/o+lCrnteMrQi3JRySlKOsm+STVtLp7zEo9Xd9ZGbVnbJKMXfhvjK68jqcDjcPFwySpU7Rku3FztR1coaWtJ8mm28zT7V6nEV8ust566fcbs3rKlNTVSEpSnBRUoy7EYucZRdtLuW67suJj+lOlNUmlmd60mpxk1Pk7K7tHRPRau10Z7dR2VNVYQk31cJTUW+zJtpWeVWvbM3q4y4FCp0opKyhaSzwqQbqOp+rPNxitdd2r0eZE3XahGTUxLkldmypfkqSkvXq5lm4xpReV25OUsyb5RtxZXtLqs0ssZZr+spRyt630y68NU999+9/MQs1KlJfqqdKXc88px81P3MaS2ybhiQiSX0IL4dP5LU+loEbxRJXQn+nT+TVPpaBFyo+TZzivvJEJtAB8+0gAAAAAAAAAAAAAAAAAAAABEfTos08LBb5U8S497jKg7eVyGEycOmujGUsM5b4wruL1unek9LeCIWljITbdSF5N6zhJQzPnKLi1fvVjc4tdYKz9d/yqd93tWI9NfwsW4Iqq6S4aWXdokvLQuOsl6kcv+JyzS14J2SXlfvLULXV20u5XfsJpdQ2P/JZyh1sI/k7Xu2lGPBpzelk9b31i09+h92LQi68UpSurSjKPZvOLT0ur5UlJ6pN24GRQ9I5xouhfLSk7tayafaSld6ya7N+alJJR0tq8NXlBy4OScZcdLptJvg7LXkc03vy8vvrOnbU6yU46ObjKVTNKd32k45XpdJWTs7vzMnamAXVx7UpZbxi3K+935a6cVbcc3s3FZTa1tqdlpcbX9mqL1ax40xL3ncxLnsbSszHoV3C6teMtJRe58teDXBl/GVrswZTI8mtrnHrM18sq0OEmu5rXzW8kboUa/Dp2/hqn0tEjTD05Tvl/Vi5v4sd7JH6D5fD5/Jan0tAqcqfk2T4seskSnAAGA0gAAAAAAAAAAAAAAAAAAAABDnT8m6mCS/YxPudAhSctSbOnz87g/iYn56BD34Ok7+XcbHFifhR+e6ObxEztjwqPlfzPrrdxknycU95Z057xv0YkptldOoWqsMr+YU3r5+dmc70lmImG1pVbb5JdzzfUmXKuIa3vwd7pruZpFM2GzaMqvZXCcXryalmXtSj7iWmSZnrCpl49Kx3s+VcQW8xn4jZjw7jNqFSKfajPRNd7TTv4am5wGEw86LlGnZThK9o55XUZZ1CdS1nFq6imm1FXvmPL1tW2rFMmPp2p5hhej9Om87lKOZRnfMtI08uXP2uy+1JX10tuebSQOh2mobTqwScbYWd4u9lLraF1FvVx5N7zloYCnSglkk6FaMY1M6SqU6q3SzWulez5b+6/cdE8HLH1ptZYQoTw9KKXZUIVKea3LVJ+18ivyf2peY71tfwlwAGIugAAAAAAAAAAAAAAAAAAAACIunVrrcEnucMTfzoa+KIgmiYOnZdvB/FxHz0bkRVFruNzhx8mPz3UsttXWspTJJc7+4ulqSLEvKzuWPilp4GInYysVLS3MxbENvVdxf6q88Hvi/Y0l71oZWD2m6Uk4xSSvpxd992+L0MPq2UuNjmJtWdwWx0vGp8w3G1drutBJRsr687r6tTN9GKM3OEop2jOPaSvlbtrb2e45tG+2dtCnQioqTlJ3k5KF1CUo5cqUpK7Vl2u9pcyWclr27WVsnHrTF0xwkhUozhdVJSvplbau3yX63xVq9yub3o7wHUbRmpwaqSw05Rlql1WejdZb2vnb9VaZf8SvHOx/SOpKslFOUFJzULqPZ3RWmmb1VrdLe00mSb0e7YqYnGvPNTvh5zzOLTSz0FFK2iXrXT17MLcStypnpMR6IcGPVomY8pJABjtAAAAAAAAAAAAAAAAAAAAAARF07ySng/i1/LNRuRHUk07XJZ6emuswd/2MT/ALqBEEpm3w51hj891PLTd9rjZaqzS+wtSqIsVWn48ixNnVMXlROTky7Rp8RCk5Sst/LvSu/rMmjTcfWTVlez9xxHqmyX1Xwo6hLWTt3Lf/QonGPJ+a+wuSd95QzpHXfvLGlDk7/Oj5FFyK1uX4UTiK7TTfr6rMFJ6K+9PTmtz/vmS/0J1pSxnak3JYWup6JJv8IoyjJ2Su+1LV8W3xd40p0bIknoSjbHT+S1PpaBzycesUyqxyIveIhNwAMJcAAAAAAAAAAAAAAAAAAAAAEN9P7/ACmD+Jif91AhmpUbehMn/EF+cwXfDEr30CG56GvxZ+VH57udRtakmFm4X8f68C5SoynuXJXKKk7vuW5d32liYe73OoXcDi50ZqcHllFpqXFNbmr7nxuXpV3Nzk98u0/O7+cw7FylOwr6ub12udYUTlc+yjy3FCOnkRC9Rhc2OGomPg6dzcYWjoT4qb8s7l5teFtUiQOheNsdP5NU+lonFOB3PQ3+nVPk1T6Wic82Pk2VOLeZzVTKAD5l9AAAAAAAAAAAAAAAAAAAAAAOI6WPRWe0MInRV61BupTjpecWrVKa72kmu+KXE84zpO7TTTTaaaaaa0aae59x7FOd9IPQfZ+OlnxGHi6n72DlTm/jSg1m9ty3x+T8OOs+jyYeXqVaUE0vFGPUhd3Vtd60Vj0d+KHZP7ut/r1ftPn4n9kfu63+vV+0tTzqzGvLmtIidx6vOMYf39rKVpzPSC6H9kfu63+vV+0u4bok2PBtvDyndWtOtWa8dJLU4/vafSXbzXmLuGpSnJJcT0rW6K9jyi1+CKN/1o1a6a8HnLNDom2VB3jTqp8+tqP5zqvNx78705vE9Z6+qFY7CqRjm0dkrpXvfRGwweHa3q3iiav+gcDZxy1bP/uT+c+Uuj3Z8YuKpz1aeZ1KmZW5O+hb/wAnhif0xP592Xfg5b+swhrFUEtV5Eo9E/o3Uw1KVetFxqVlFRg9JRprW8lwcnrblFHQ7L9EcFh5KcKKc1qpzcptPmszsn3pG9KXM5/xq9KxqE3G4XwrdreoADNaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=', alt: 'Blue Phone Case', type: 'image' },
          ]
        },
      ],
      materials: [
        { id: 'silicone', name: 'Silicone', value: 'silicone', available: true },
        { id: 'hard', name: 'Hard Case', value: 'hard', available: true, priceModifier: 5 },
      ],
      sizes: [
        { id: 'iphone14', name: 'iPhone 14', value: 'iPhone 14', available: true , priceModifier: 0 },
        { id: 'iphone15', name: 'iPhone 15', value: 'iPhone 15', available: true, priceModifier: 20 },
        { id: 'samsung', name: 'Samsung S24', value: 'Samsung', available: true, priceModifier: 35 },
      ],
    },
    specifications: [
      { label: 'Protection', value: 'Military Grade Drop Protection' },
      { label: 'Compatibility', value: 'Wireless Charging' },
    ],
  },
  {
    id: '03',
    name: 'Custom Baseball Cap',
    slug: 'baseball-cap',
    shortDescription: 'Classic baseball cap with embroidered customization.',
    description: 'Top off your look with our custom baseball cap. Features adjustable strap, breathable fabric, and high-quality embroidered personalization options.',
    basePrice: 39.99,
    rating: 4.6,
    reviewCount: 567,
    category: 'Accessories',
    tags: ['headwear', 'casual', 'customizable'],
    inStock: true,
    stockQuantity: 145,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=800&fit=crop', alt: 'Cap side view', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop', alt: 'Baseball cap', type: 'image' },
    ],
    variants: {
      colors: [
        { 
          id: 'black', 
          name: 'Yellow', 
          value: 'yellow', 
          hex: '#FFFFC5', 
          available: true,
          priceModifier: 0,
          images: [
            { id: 'b1', url: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=800&fit=crop', alt: 'Black Baseball Cap', type: 'image' },
          ]
        },
        { 
          id: 'white', 
          name: 'White', 
          value: 'white', 
          hex: '#FFFFFF', 
          available: true,
          priceModifier: 10,
          images: [
            { id: 'w1', url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop', alt: 'White Baseball Cap', type: 'image' },
          ]
        },
        { 
          id: 'navy', 
          name: 'Navy', 
          value: 'navy', 
          hex: '#1E3A8A', 
          available: true,
          priceModifier: 20,
          images: [
            { id: 'n1', url: 'data:image/jpeg;base64,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', alt: 'Navy Baseball Cap', type: 'image' },
          ]
        },
        { 
          id: 'red', 
          name: 'Red', 
          value: 'red', 
          hex: '#DC2626', 
          available: true,
          priceModifier: 25,
          images: [
            { id: 'r1', url: 'data:image/jpeg;base64,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', alt: 'Red Baseball Cap', type: 'image' },
          ]
        },
      ],
      materials: [
        { id: 'cotton', name: '100% Cotton', value: 'cotton', available: true },
        { id: 'polyester', name: 'Performance Polyester', value: 'polyester', available: true, priceModifier: 5 },
      ],
      sizes: [
        { id: 'adjustable', name: 'Adjustable', value: 'One Size', available: true },
      ],
    },
    specifications: [
      { label: 'Style', value: 'Baseball Cap' },
      { label: 'Closure', value: 'Adjustable Strap' },
    ],
  },
  {
    id: '04',
    name: 'Premium Water Bottle',
    slug: 'water-bottle',
    shortDescription: 'Insulated stainless steel bottle with custom engraving.',
    description: 'Stay hydrated in style with our premium insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Features leak-proof lid and custom engraving options.',
    basePrice: 44.99,
    rating: 4.9,
    reviewCount: 1523,
    category: 'Drinkware',
    tags: ['eco-friendly', 'insulated', 'customizable'],
    inStock: true,
    stockQuantity: 89,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop', alt: 'Water bottle', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=800&fit=crop', alt: 'Bottle detail', type: 'image' },
    ],
    variants: {
      colors: [
        { 
          id: 'silver', 
          name: 'Stainless Steel', 
          value: 'silver', 
          hex: '#C0C0C0', 
          available: true,
          images: [
            { id: 's1', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop', alt: 'Silver Water Bottle', type: 'image' },
            
          ]
        },
        { 
          id: 'black', 
          name: 'Matte Black', 
          value: 'black', 
          hex: '#000000', 
          available: true,
          images: [
            { id: 'b1', url: 'data:image/jpeg;base64,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', alt: 'Black Water Bottle', type: 'image' },
            
          ]
        },
        { 
          id: 'blue', 
          name: 'Ocean Blue', 
          value: 'blue', 
          hex: '#3B82F6', 
          available: true,
          images: [
            { id: 'bl1', url: 'data:image/jpeg;base64,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', alt: 'Blue Water Bottle', type: 'image' },

          ]
        },
        { 
          id: 'pink', 
          name: 'Rose Gold', 
          value: 'pink', 
          hex: '#F472B6', 
          available: true,
          images: [
            { id: 'p1', url: 'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=800&h=800&fit=crop', alt: 'Rose Gold Water Bottle', type: 'image' },
            { id: 'p2', url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=800&fit=crop', alt: 'Rose Gold Bottle Detail', type: 'image' },
          ]
        },
      ],
      materials: [
        { id: 'steel', name: 'Stainless Steel', value: 'steel', available: true },
      ],
      sizes: [
        { id: '500ml', name: '500ml', value: '500ml', available: true , priceModifier: 0},
        { id: '750ml', name: '750ml', value: '750ml', available: true, priceModifier: 10 },
        { id: '1000ml', name: '1000ml', value: '1L', available: true, priceModifier: 15 },
      ],
    },
    specifications: [
      { label: 'Capacity', value: '500ml - 1000ml' },
      { label: 'Insulation', value: '24h Cold / 12h Hot' },
      { label: 'Material', value: 'Double-Wall Stainless Steel' },
    ],
  },
  {
    id: '05',
    name: 'Custom Tote Bag',
    slug: 'tote-bag',
    shortDescription: 'Eco-friendly canvas tote with personalized print.',
    description: 'Carry your essentials in our eco-friendly custom tote bag. Made from sustainable cotton canvas with reinforced handles and customizable designs.',
    basePrice: 29.99,
    rating: 4.5,
    reviewCount: 834,
    category: 'Bags',
    tags: ['eco-friendly', 'reusable', 'customizable'],
    inStock: true,
    stockQuantity: 167,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop', alt: 'Tote bag', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?w=800&h=800&fit=crop', alt: 'Bag with items', type: 'image' },
    ],
    variants: {
      colors: [
        { 
          id: 'natural', 
          name: 'Natural', 
          value: 'natural', 
          hex: '#F5F5DC', 
          available: true,
          priceModifier: 0,
          images: [
            { id: 'n1', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop', alt: 'Natural Tote Bag', type: 'image' },
          ]
        },
        { 
          id: 'black', 
          name: 'Black', 
          value: 'black', 
          hex: '#000000', 
          available: true,
          priceModifier: 30,
          images: [
            { id: 'b1', url: 'data:image/jpeg;base64,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', alt: 'Black Tote Bag', type: 'image' },

          ]
        },
        { 
          id: 'navy', 
          name: 'Navy', 
          value: 'navy', 
          hex: '#1E3A8A', 
          available: true,
          priceModifier: 35,
          images: [
        
            { id: 'nv2', url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFRUXFRYYFRcVGBgXGhgWFxcdFxgVFRUaHSggGB0lGxUVITEhJikrLi4uFx8zOTMsNygtLisBCgoKDg0OGhAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABAIDBQYHAQj/xABCEAABAwIDAwgGCQQABwEAAAABAAIDESEEEjEFQVEGImFxgZGhsQcTUrLB0SMyQmJygpLh8BQzY3NDU6LC0uLxNP/EABsBAQACAwEBAAAAAAAAAAAAAAABAgMEBQYH/8QAOBEBAAICAAQEBAQFAgYDAAAAAAECAxEEEiExBTJBURNhcZEigbHwBiMzcqEU4VJissHR8RUkNP/aAAwDAQACEQMRAD8A7igICAgICAgICAgIFUBAQEBBbdO0GhcAeBIVJyVidTMG1THg3BBHRdWiYnrAqUggICAgICAgICAgICAgICAgICAgIOHcq9oYhmMxDRPKAJXUAkfYE5gAK2FDYLv8NjpbFWZrHb2hyctrRkmNz392x8jMQ+TD1e5znB7gS4lx46m+hC8P/EFPh8bPL03ET0+3/ZsYJ3VC5XbRxEUsYhmkjaWEkNcQCQ7WgtX5Lr/wzSuXDk543q3/AGY8+S1JjUuhckcU+TBxPkdmcQauO+jiL9gWzxVYrltWsdG5gtNscTLKnEM9pveFh1LLuHN/SziSX4djXGmR7jQ2NSADb8JXV8NpExaZj2aPG31NYVci/wD8jK3OaW5v/wARy8X4/wBOPvH0/wCmE4J3SGucr5XjEuyvcBlZYEgaV0Xqf4cx1ngYmY9Z/Vr57zF+jb/RO15ZO9znOBcxoBJNCASTf8QWx4lqJrEQ2OC3PNMt+XMbwgICAgICAgICAgICAgICAgICAg4ly5jpj8TX2mnviYfivQ8FP8iv79XG4n+rb9+jFbJ2tPSSKDExYejg4mRhe5xIpzBoAMt+tec8cw0ycVSfhzeZjWo+v+7Y4eYpTdlnHbUmJ+nnbOW1DXiMR2NzUDXTfRdbwvgo4Sk9NTbW43vWvmw571yzHLC9s3DbQxjR/TRSvjBoHFwZGN5oXEDfW1TdbOXiMeOevdNMF7R8mXdyD2u0VyQv+62W/VzmgeKxR4hRkngZa/i8XJBIYcVEY3tpVpoaAiooWkjuO9bePPW0bhr3wWrOkuLamMyMZg8RFGwF1RI3e5xcSX5XWvSlFxvEPB8We9s8RzTPp9I107MuDPWkct4/NRjMVM6UjEGJ0oa2phdmaRSg3ChtcUWz4HNI4bkpExETPSe/urxMRzbjs6t6MoqYOvtSOPcA34LH4jO82vlDc4KP5e/m21aDbEBAQEBAQEBAQEBAQEBAQEBAQEHHPSLEf66XQAiM1P8AraO3Rd7gZ/kR+bkcX/VlqDcLlL6TEB4GYBhvStL13VV/gVnL8T11pT4luXl1/lBOy6vzOmc4cPVinXd6n4U82+bp7LfE6aiv+f8AZuXJzlScLEIc8mQvLyYmsa8khoy5nZgG83cK31C1uK4Kc1uaLa/Jkw57UjXL/llcVy8jAPq5cZmoaZjEWh26o9XcA7qhan/xVv8AjZZ4v2rP3ho3KiV+MmfOZAHSBmYFpAq1gZaldzQeslbuHh70xck2ifnrTBOWZtzTH+WMwezcRHTI+Mnpe5pI3Cjm06NVOPFmpadzEx+hfJjtHWJhkZXP+s+F0b7ZjTmuGn1hY962qz8mHp2idw7l6P2UwEPTnPe9y4nHTvPb9+jqcJGsUNiWo2BAQEBAQEBAQEBAQEBAQEBAQEGo8tOWTMKDHEQ+c/pjr9p/Twb/AA7nC8LOWd28v6tfNn5Okd3JJ8U6R5e9+d7jUuJqSSu1WsRGo7ObM+qO7VXQPKDxikW6KqVxjUiCZZnZOw5sSQY8gGYDnva0necrSauAHALFlz1x918eKb9k7G7AxMBe6zmsOVxjeHAWrVzdQL7wNFTHxFLzHz9zJw8xvcbbFyJ5W+rLcPPQMNo30ADfuupu6dy1uM4Tm/mU7+rJwufk/BaejpK5DpiAgICAgICAgICAgICAgICAg5j6SeVUoc2HCOdWtH5XZQ4OIaKkXAvuoTeicLjvxF5mnljpv02wZM9aT1aJPCWZcxBJbc9IN9aneNSvR4sfJWK725k5fiWm2lhw6lmQtkoPCSUAWUjxt1GkzK5GdylDOcntrtwsnrfVh7g0ht6BpOp66eZWvxOG+WvLWde/Tf8A4XxZOS29MlJy9xLpK0YGkHmbq0sXEUJpwWpXw2mtWtMz9mX/AFN+7C5HG5HTu8F0orrs1OaNt+5F8pi1scU7uYaNY4/ZNaNaTwNh0W7OXxnCRMTekdfVtcNxU8/w7dvR0Bcp1BAQEBAQEBAQEBAQEBAQeEoOf8suWLm0jhbWpq6poAwXJcdb6AU31KwcNjycbeYr0pHeff8Afs1svEVp3aDNiDJJnIDS4tJDdBShoK3Nm0qTXevU4cNcdIpXtDl5bzbdpUbUFQw8M3jT5LOxYp6yhCOumnFIhl2qMIVkbGBAkYKXNElMMbhdpxOfkFehx0PyWlj47HfJyRH5tm/DXrTmn7MmyP8AgW61ZlVM0UoO1CJWYY7gppMyniM6fzwTSu4Sn19TH0FpPVU/EhUnux11zy6Vyb5XQOjgimkpM76MVDqOcK5efTLUgDfqVweKwTjvM66T2drhs0XrrfWO7bVqtkQEBAQEBAQEBAQEBAQQdt4sRQSPNfqkCmpcbADt37tVW0TMaj16ItOo24cx5e19TUnMSTvsvScPhrhxxSsdIh5/LbdtrML6EVGtPE0+KzJv1iVWLFco6T3AD5hSpj6TKkBWXe5UHjmoMXtNr5HMgjFXyODRU0F+J3LneJZ4xYZmW3wtYm+59ETE8j8bAHSvh5rec5zZIzlAIJNM1TpuC83h4/De8RW3X06S6XNW3RmcJcA8AvaVncOJZdfGpRt7DF5qUTK7C15N3U7FB0TXGkLfwt8XNVZYa+f81vDPu5u4g7gd2UkV6HFUyY4vXU9mabzS0Wr3dS5FbV9bH6tziXs1qSSbDMam5ua/mC85mw/Ayzj9O8Oxw2b4ldtlVGwICAgICAgICAgICAg0b0p4iRkURYeaXSNcPxxub5FyzcJim/EVn0iJn8+mmtxVpirmcT6RyHg1x/6R8V6KOzjXjdoW4sRnDRwcB3An4KNr2jW07FMoGdTvHKrQxY56yi5wFZkVAoKcygY+bZJnmiaJCwue1uYagk2IXM8ViI4a1566jem3w19TpmsbyHxTI3uOOc5jWlxblIzZRWn1rVovHcHxeG+elfh6mZiNtyZisb0x+FFBQr6JDlSkkqVXsLroSu0O5EJBP0DT92P3gqMNfP8AmsxO+laOLXfBSyZOzaOROO9Xi8p+1UDt3eRXK8Vp+CuSPSdT9J6frpt8DflmI93Uly3YEBAQEBAQEBAQEBAQcz9L+K50EVbUe89JJDR5FdPw6vmlo8ZPaGgHmxPPtPDR1AhvjQntXUhzZ/FeIXoWgm3T4NNPNTKLdknazrMpwP8A2pEqYo6yhsYpiGaZXH2VlYWi6nH+dqhbTIbKi+mhJ19ay3C9u1c7xbrwWX+2VsNv5kabtth/0Ev+t3Ral1898LiJ4zFE/wDFDfyzPJP0c59WG0obcfgvqcObE7e5gp2nStpsoQvCQcVKNJWLth2/hj95vzVGCnn+6Dh31mj6njyUs2TysrgMTkxLSfsvYesANqO6qxZscZMdqz6wnBPLqfm7cvNvQCAgICAgICAgICAgIOPelHE5seB/y42DtJL/ACcF2OAjWPfzc3i53fXyapjXVij/ABt91b09mjTzybOxAMhA3A+X7KYnZljVUzGGrGH+XA+SQrTpaVsPAFldbUyizSnr6FEyvEQkYeKgrbMd/CvBQpad9E3Zp+lhP+VnvAfFaPicf/Ty/wBsrYf6kNz2v/Yl/wBb/dK+eeGTrjMX90fq6OTyT9HPIjdw1GtF9RcyVh7wDY23dHQe9Nrx1XozvViV1xFERpPxVfVU4Nj94V8lRr080fWUHBf3WfhefJSy5fL+aqaQ53EaV8gB8FJXyu+YSTMxjuLWnvFV5e0amYegrO4heUJEBAQEBAQEBAQEBBwD0kbVa3aM+a/PaOxsbW/BdfDmpjxV3P7252TFa+S2lPIvBMxrXl5LWxvaA1pueYDUncDmpQcCuL4n47lw6pjr1n1n/wAH+kittzLbNo4CKLDUjY1oa5uguaml3ak33rmeDcblyeIVnLaZ3uP8fZTiax8KdNRxN4203Pp4OC97DRp5lpkXHwUsk2UYpvNyi1bH90RE+qQ82UqR3XcAefD/ALY/fC0vEY3wmX+2f0ZMX9SG9bW/sy/63+6V848P6cVi/ur+rpX8sudD6x6l9T9XL9EfBAF9Dp8Co9VrdkkxXt3H5qyIv7vK7iP50KdrM9Dhw8hrtHNYDSxoeB7VqcVlnFhvkjvFZn7NanmrHzScRyPMZzQvzANcMr/rXI0dodOhed4P+Jsc6jiK6+cdY+3f9XQzcNMx+FpcO0g5xa0HNV+YEEUo4g1r0ghekw8TjyxuilsFqR+J9F7IP0EX+qP3QuDk88/V16eWEtUWEBAQEBAQEBAQEGF5YYiSPCvfG4to6PO5tA4RmRokIJ0o0uNdbGlDdYs82jHaad9Ins+WeUmGdFipo3lziJHc5xLiQbglxuSQRcqOHyfExVv7wis7hnuQXKNmEe8y5vVuZQ5QXHM01ZRo45n36Atbj+DvxFY5I6xKuSN6bFieVs2I5kcYjgLhd93uFQeNG+PWuh4X4FXDaubJO7R212/3c/PkjlmqK6atulx8f3XpWlELsZVoTKiTUKSF1+iKx3XMA+j4jwkZ74Wpx0b4bJH/AC2/Rkp54+rfdp/2pPwP90r5nwc64jHP/NH6ulftLnQvQ9C+rOWhQOpJ2qFrdmSLb1VmNVkBN/52Ib0ybMSI6PINGhlaXNjS3FaXH4r5eHvSneYmIUxeePq2PC8qMJJSkrWOvRknMdpWzXUJ/ZfOc/h/EYLavSXbrO+zgUmIJdmFiaOta7ucfFxXqa7rEabOn0t6L8dNJg4xM4vIijcHOpXnZubYCwDW63vqsGDNbJa+/SdQik7bithYQEBAQEBAQEBAQWcZhmyxvjeKte1zXDi1woR3FB83cvtjSf1bmyZM7Wsjc5uY5sooJCCBQkUNL0tc6p4dwP4JiJ6c0/v6Na+aMc6Q9mbMY2OTeakEngDT4L0GLBWldQ5+XNa14ToX3aBpUeazsdt6lId8XKGOF6LRWhLzeguuClEPITQt/Gz3gtbjP/z5P7Z/Rennh0HaX9uSvsP90r5dw39ak/OP1dOeznUH1R1L6xXs5UoTxR6eq/oyMZsrMcr0OqmVZV4s8wjoaO7/AOKqtPN92Ffslk7vpBcN16jUeZWO+Kt/M2ZzWxx+Fr20NiPZJS7mkkAjUHp46LmZ+Cms7q6GHiotXq+kfR/hXswjM7MhIbQZg7mtYGg1FrkOPauLwuOKUnU73My2aRqGyrZXEBAQEBAQEBAQEBBxj0ttpjgaawxnru8fBdfgf6f5ufxXn/JqeHhdlc7RpuOLrX7Larfjs0bzHNClmoNBqPNSme0pMgv+Y+ShiquQ6K0LSN1QXXOUohakeW5SBXK9rqccrgaeCw8Rj+JitSPWJj7slJ1bcthm5aOcHD+lsQQayDeKewvJ1/hrLFomckdPk254mrXcEOaAdwXsKxqGlZHxLbqUx2ScMbIrKSCpUkxZseseRKhFO8LWzxzj+EqVsvaFMz+caCoqa+fxSVsfld42GwDDQgaeqjp+kLzFqxW0xHu7uPyx9E5VXEBAQEBAQEBAQEBBzL0r7PzTwSO+p6twPW11QP8ArXT8PnpaHP46damHO8Tii9wAs2pt0BvzIHYuk0YrywjNjFARa179CnS+/dkJde34IwVVRFTCz2PVSK3IQ9ohtSQgpw2h60JW8S1EwqwosiJSCpVU414ymumc+X7qJRj7/kt7OcC6gduukaWyxOnmNa9j3VGpqDuIoBbu0UTK2PU1d/2bHlijbwjYO5oC81ed2mXdrGohJVVhAQEBAQEBAQEBAQcT9JfKZ808kBhMQgk9U1zjzpC8NJflpRrdC25qL20XT4GsxWbe7Q4vU2iPZq8Lb9nnf4rptCVplbC27xSNrphNWg/h8R+6MMd1UZUrLkWqmESrcUHqIeIKYND1lEyonQhcgFkRK83VSrPZHxdaNpf6x8VCcfeUXD3fplNiCLb6keA8U7slukNh2fK1+Vkjc3OFBxIoaDgd3f2Uv5ZYojltE1dwC809GICAgICAgICAgICAg+eeX20PX7RfTQS07GcweDa9q7eCvLjrX8/u5WS3Na1vyRTYu6B8FttVGjkoOwJtkmNpbBzB1N8D+yMU+ZW1ErkeqmEK3BSgQeoKYxr1oSokCJhdjFlKq9GEUshY6nNB9keKiWXH6/VFrlo8GtCAeoqF569GcimMcjZG3ymOUDjRxsotXmia+7FWdTEu6wyBzQ4aEAjqN15qY1OnoYncbVqEiAgICAgICAgICCiZ+VpdwBPcKqYjcons+YWPz4kuO8k969DEdXHmfwMjIPr9SyMPsjVsOgIyJkN2jqd5ow26SqRKppUwLhUoe1RD1EvBvUoUUuoSuxhSrK4Ha9Rp1AAfEIrPoh7QcA41FdB4KJZMUfhWcLR7JKD7Q06lELW6TDIQmpA/xU7nOKn1Unt+buHJ99cNAf8ADH7oXnM8ayW+su7hneOv0hkFiZRAQEBAQEBAQEBBD2wzNBMOMTxbpaVanmj6q38svmjBH6Qu+8B4r0Md5ce3lhlyLO6fkrsSI5ilfaXgTan3vMfsoYsndUAidvUFYKsgQeqR61EACgVtUolXHcngGmv5iP8AxKKSxxkBJdSpJKrtsRGo092LU+s6XDwslfVGX0XsQ4smj/BftJ+CeqI61l3Pkq+uDgP+No7rfBef4mNZbfV2eG/pV+jKrAziAgICAgICAgICCmRgIIOhFD1FB8z7RwZgxMkLtWzlvWATQ9ov2r0GO3NEW93ItGtx7MhMOae3yWVrwiVU7WewyZSiLRuEqZt67jcfH+dKlSvspCJVBBWCpQVKkVByhD1B7mUoUzuo08X2/KP3JUSVjc/REGUbqpGmZL2NDQA9ZPWVHox3ncrG2XfSt6viVC1PLLu3JOPLg8OP8TT3ivxXA4md5bfV2eHj+VX6MssDMICAgICAgICAgICDi/pr2P6qZmLaObIWB/Q9nNr2tI/SV0+Dy/g5fb9Gjnpq+/dr2MFGu6l0tudXuhqV3hCCuHE0GV1S3dxCK2pvrC61wOhB6iAe43Tav1VhjvZJ7FKOaPd5kf7DvD5qNSc1fd5V3svH5SfJT1Nx7qw48Hfpd8k2dPdcbXq6XW802jcH9Q38Xl2nep2csyjyOLjUlRpkjURqFIZdSbZjDtytaOgeSqwz3YXbJrM0DWyT6M2Pyy+idmw5Io2eyxg7mgLzd55rTLt0jVYhJVVxAQEBAQEBAQEBAQan6Utkf1OzMQxoq9rfWM64+caflzDtWbh7av8AXoxZY/Dv26uPukzwtePtMae8Bd2s7jbjzGrzCw5iuQtFyhZ44qRbeyu6vYmtmwRncSOokfFOU2uMid7Tv1OTlRuPZV6h25zv1H5qeU3Hs89Q/wBp36j81HKbhdZhyN3epiETK+GP6lbqruHhbTrQ7vQbIJ+IlpC153NCpDHEfi0i8kNnPx2OjH2Q4F/QxtyO3TrKwZ8vJSbNzHj3MUfQ64DriAgICAgICAgICAgIPHCtig4ryx5LuwTqMvA55MR9kE5jE7qNacR1FdnheIjJGp7uVxGCaW3HZrL2k9Z06OkrclrxOnjcMwHnUJ+8aeASJhWZtPZfHquEfePkrbhTV/eV1scfst/Up3CJm3vK4cNGfsdx/dFea3upOGZ/y3fq/wDZE81vdU3Dt9l4/N+6I5re8LrcM373eFKOez0wMHt94RMWspOFYdHyDu+SHPaPZDfgXA1Dsw37iOxQyRk30mFxrAo2srl2bPjHtw2GaXBgAkcPqh3BztAB523LXvkrWN2nUMuGk76RuXXuQ/JJmAhy1zyu/uP4/dbwA8VyOIzzln5Q6mHFydZ7y2Va7MICAgICAgICAgICAgIIG29kx4qF0Mgs7QjVrho5vSFfHknHbmhW9IvGpcU27sOXBTZJSDmH0bm1o5tbm4sbCovS3FdnDnrljcORnxWpOmGldUkrY2xx2eiRN6TpakxgFy1w6KVtxJ0WGeIisbtEwyxg3OomF6LGMOtusUV68Tjn1+/RS3D3jtC4ydhtUdCvGWk9IlScVo66JcQxoubk0Fib8LDVRbPSO8pjDefR5FI03Punu0Vf9RT3/wASn4Nv3MK45g40bHpqXCndanilMs2nWvuWxxWO/wBlbdebc9FgPmsrFMJ0AcLm9Bbr4dKiZU11bNyP5EyTZZMS1zIsoOQ1a95p0ULB02PmtDieMisctO7oYeFm07t2dL2fgIoGCOKNsbBo1ooOs8T0rl2tNp3MujWsVjUQkqqwgICAgICAgICAgICAgIPHOAFTYDUlBzuDZf8AWbTe7EAzQsq+Nsh5rWubRoEWl65gTeyxY8tueYj0V3FvwzD3a3oricS7DzOjJvkePWN6gbOHaSulTjbR5o21rcLWe0tXxvo62hH9VjJR/jeAe5+VbdeNxz36MFuFvHZi5uTOOZrhJvysL/cqsscTintaGOcN49EKXAzN+vBK38Ubx5hX58c+sf4V5bx6StCI+wf0n5JEY/kTz+u11m6rdNLadStHJ07dFZi3XukxxPd9Vjz1NcfIKeesesKclvZLi2NiXm2HmPQIn076UUTmxx3tH3WjFee0T9me2dyHxj9WNiHF7hXubU+S178dijt1Za8Hkt36Nx2HyIhhyukJle0hwrzWgi4Ibv7SVo5uNvfpHSG3i4SlZ3PWW1LTbYgICAgICAgICAgICAgICAgw22MWTLHhw0HOC65AaaaNdvLbEkDWlN5WvkyfzIxx7bUmeumP9UIcZFTnSSVzuBFaFpLw8cC4McOohU3FMkV9Z/f/AKR2s2lbbIICAgICAgICAgICAgICAgICAgICAgICAgICDC7d2CJ3NeHUc3Tx+ZWlxXCfFtFonqpenN1ebH5Pthdnccz9x4KOG4OMc81p3KK011ZtbzIICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg//9k=', alt: 'Navy Bag Detail', type: 'image' },
          ]
        },
      ],
      materials: [
        { id: 'canvas', name: '100% Cotton Canvas', value: 'canvas', available: true },
        { id: 'organic', name: 'Organic Cotton', value: 'organic', available: true, priceModifier: 18 },
      ],
      sizes: [
        { id: 'medium', name: 'Medium', value: 'M', available: true },
        { id: 'large', name: 'Large', value: 'L', available: true, priceModifier: 10 },
      ],
    },
    specifications: [
      { label: 'Material', value: '100% Cotton Canvas' },
      { label: 'Dimensions', value: '38cm x 42cm' },
      { label: 'Handle', value: 'Reinforced Cotton' },
    ],
  },
  {
    id: '06',
    name: 'Wireless Noise-Cancelling Headphones',
    slug: 'wireless-headphones',
    shortDescription: 'Premium sound quality with active noise cancellation technology.',
    description: 'Immerse yourself in crystal-clear audio with our wireless noise-cancelling headphones. Featuring advanced ANC technology, 40-hour battery life, and premium comfort padding. Perfect for travel, work, or relaxation.',
    basePrice: 249.99,
    compareAtPrice: 349.99,
    rating: 3,
    reviewCount: 892,
    category: 'Electronics',
    tags: ['audio', 'wireless', 'premium', 'bestseller'],
    inStock: true,
    stockQuantity: 78,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop', alt: 'Headphones front view', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop', alt: 'Headphones side view', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop', alt: 'Headphones detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Matte Black', value: 'black', hex: '#1F2937', available: true,priceModifier: 0 },
        { id: 'silver', name: 'Space Silver', value: 'silver', hex: '#9CA3AF', available: true,priceModifier: 25 },
        { id: 'white', name: 'Cloud White', value: 'white', hex: '#F9FAFB', available: true,priceModifier: 35 },
        { id: 'blue', name: 'Ocean Blue', value: 'blue', hex: '#3B82F6', available: true,priceModifier: 46 },
      ],
      materials: [
        { id: 'standard', name: 'Standard Padding', value: 'standard', available: true, priceModifier: 0 },
        { id: 'memory', name: 'Memory Foam', value: 'memory', available: true, priceModifier: 30 },
      ],
      sizes: [
        { id: 'universal', name: 'Universal', value: 'One Size', available: true, priceModifier: 0 },
      ],
    },
    specifications: [
      { label: 'Battery Life', value: '40 Hours' },
      { label: 'Charging', value: 'USB-C Fast Charge' },
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
      { label: 'Weight', value: '250g' },
    ],
  },
  {
    id: '07',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    shortDescription: 'Track your health and fitness with advanced sensors and AI coaching.',
    description: 'Take control of your wellness journey with our smart fitness watch. Features heart rate monitoring, sleep tracking, GPS, and personalized AI coaching. Water-resistant design with 7-day battery life.',
    basePrice: 199.99,
    compareAtPrice: 279.99,
    rating: 4,
    reviewCount: 1456,
    category: 'Electronics',
    tags: ['fitness', 'smart', 'health', 'popular'],
    inStock: true,
    stockQuantity: 142,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop', alt: 'Smartwatch display', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop', alt: 'Smartwatch on wrist', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&h=800&fit=crop', alt: 'Smartwatch features', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Midnight Black', value: 'black', hex: '#000000', available: true },
        { id: 'silver', name: 'Aluminum Silver', value: 'silver', hex: '#D1D5DB', available: true },
        { id: 'rose', name: 'Rose Gold', value: 'rose', hex: '#F59E0B', available: true },
      ],
      materials: [
        { id: 'silicone', name: 'Sport Silicone', value: 'silicone', available: true, priceModifier: 0 },
        { id: 'leather', name: 'Genuine Leather', value: 'leather', available: true, priceModifier: 40 },
        { id: 'metal', name: 'Stainless Steel', value: 'metal', available: true, priceModifier: 60 },
      ],
      sizes: [
        { id: '40mm', name: '40mm', value: '40mm', available: true, priceModifier: 0 },
        { id: '44mm', name: '44mm', value: '44mm', available: true, priceModifier: 20 },
      ],
    },
    specifications: [
      { label: 'Display', value: '1.4" AMOLED' },
      { label: 'Battery', value: '7 Days' },
      { label: 'Water Resistance', value: '5ATM' },
      { label: 'Sensors', value: 'Heart Rate, SpO2, GPS' },
    ],
  },
  {
    id: '08',
    name: 'Leather Laptop Messenger Bag',
    slug: 'leather-messenger-bag',
    shortDescription: 'Handcrafted genuine leather bag with laptop compartment.',
    description: 'Sophisticated and practical, this handcrafted leather messenger bag is perfect for professionals. Features a padded laptop compartment, multiple pockets, and adjustable strap. Ages beautifully with use.',
    basePrice: 159.99,
    compareAtPrice: 219.99,
    rating: 5,
    reviewCount: 567,
    category: 'Accessories',
    tags: ['leather', 'professional', 'laptop', 'handcrafted'],
    inStock: true,
    stockQuantity: 92,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop', alt: 'Messenger bag front', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop', alt: 'Messenger bag detail', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop', alt: 'Messenger bag in use', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'brown', name: 'Vintage Brown', value: 'brown', hex: '#92400E', available: true,priceModifier: 0 },
        { id: 'black', name: 'Classic Black', value: 'black', hex: '#000000', available: true,priceModifier: 23 },
        { id: 'tan', name: 'Caramel Tan', value: 'tan', hex: '#D97706', available: true,priceModifier: 30 },
      ],
      materials: [
        { id: 'fullgrain', name: 'Full-Grain Leather', value: 'fullgrain', available: true, priceModifier: 0 },
        { id: 'topgrain', name: 'Top-Grain Leather', value: 'topgrain', available: true, priceModifier: -20 },
      ],
      sizes: [
        { id: '13inch', name: '13" Laptop', value: '13"', available: true, priceModifier: 0 },
        { id: '15inch', name: '15" Laptop', value: '15"', available: true, priceModifier: 15 },
        { id: '17inch', name: '17" Laptop', value: '17"', available: true, priceModifier: 25 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'Dimensions', value: '16" x 12" x 4"' },
      { label: 'Compartments', value: 'Multiple Pockets' },
      { label: 'Strap', value: 'Adjustable' },
    ],
  },
  {
    id: '09',
    name: 'Ceramic Coffee Mug Set',
    slug: 'ceramic-mug-set',
    shortDescription: 'Artisan-crafted ceramic mugs with unique glazed finish.',
    description: 'Elevate your morning coffee ritual with our handcrafted ceramic mug set. Each piece features a unique glazed finish and ergonomic handle. Microwave and dishwasher safe. Set of 2 or 4 mugs.',
    basePrice: 39.99,
    compareAtPrice: 59.99,
    rating: 2,
    reviewCount: 834,
    category: 'Home & Kitchen',
    tags: ['ceramic', 'artisan', 'coffee', 'handmade'],
    inStock: true,
    stockQuantity: 215,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=800&h=800&fit=crop', alt: 'Mug in use', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=800&fit=crop', alt: 'Coffee mug set', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&h=800&fit=crop', alt: 'Mug detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'white', name: 'Ivory White', value: 'white', hex: '#F9FAFB', available: true,priceModifier: 0 },
        { id: 'blue', name: 'Ocean Blue', value: 'blue', hex: '#1E40AF', available: true,priceModifier: 15 },
        { id: 'gray', name: 'Stone Gray', value: 'gray', hex: '#6B7280', available: true,priceModifier: 45 },
        { id: 'green', name: 'Sage Green', value: 'green', hex: '#059669', available: true,priceModifier: 60 },
      ],
      materials: [
        { id: 'standard', name: 'Standard Ceramic', value: 'standard', available: true, priceModifier: 0 },
        { id: 'premium', name: 'Premium Glaze', value: 'premium', available: true, priceModifier: 10 },
      ],
      sizes: [
        { id: '2pack', name: 'Set of 2', value: '2 Mugs', available: true, priceModifier: 0 },
        { id: '4pack', name: 'Set of 4', value: '4 Mugs', available: true, priceModifier: 30 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'High-Quality Ceramic' },
      { label: 'Capacity', value: '12 oz per mug' },
      { label: 'Care', value: 'Dishwasher & Microwave Safe' },
      { label: 'Origin', value: 'Handcrafted' },
    ],
  },
  {
    id: '10',
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-speaker',
    shortDescription: '360° sound with deep bass and waterproof design.',
    description: 'Take your music anywhere with our portable Bluetooth speaker. Features 360° surround sound, powerful bass, 24-hour battery life, and IPX7 waterproof rating. Perfect for outdoor adventures.',
    basePrice: 89.99,
    compareAtPrice: 129.99,
    rating: 1,
    reviewCount: 1023,
    category: 'Electronics',
    tags: ['audio', 'portable', 'waterproof', 'outdoor'],
    inStock: true,
    stockQuantity: 187,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop', alt: 'Bluetooth speaker', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&h=800&fit=crop', alt: 'Speaker detail', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop', alt: 'Speaker outdoors', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Carbon Black', value: 'black', hex: '#111827', available: true,priceModifier: 0 },
        { id: 'blue', name: 'Electric Blue', value: 'blue', hex: '#2563EB', available: true,priceModifier: 15 },
        { id: 'red', name: 'Flame Red', value: 'red', hex: '#DC2626', available: true,priceModifier: 30 },
        { id: 'green', name: 'Forest Green', value: 'green', hex: '#059669', available: true,priceModifier: 45 },
      ],
      materials: [
        { id: 'standard', name: 'Rubber Finish', value: 'standard', available: true, priceModifier: 0 },
        { id: 'fabric', name: 'Fabric Mesh', value: 'fabric', available: true, priceModifier: 15 },
      ],
      sizes: [
        { id: 'compact', name: 'Compact', value: 'Small', available: true, priceModifier: 0 },
        { id: 'large', name: 'Large', value: 'Large', available: true, priceModifier: 40 },
      ],
    },
    specifications: [
      { label: 'Battery', value: '24 Hours' },
      { label: 'Connectivity', value: 'Bluetooth 5.0' },
      { label: 'Water Resistance', value: 'IPX7' },
      { label: 'Power', value: '20W Output' },
    ],
  },
  {
    id: '11',
    name: 'Yoga Mat with Alignment Marks',
    slug: 'yoga-mat',
    shortDescription: 'Non-slip eco-friendly yoga mat with alignment guides.',
    description: 'Perfect your practice with our premium yoga mat featuring alignment marks for proper positioning. Made from eco-friendly TPE material, extra thick cushioning, and superior grip. Includes carrying strap.',
    basePrice: 49.99,
    compareAtPrice: 69.99,
    rating: 3,
    reviewCount: 756,
    category: 'Sports & Fitness',
    tags: ['yoga', 'fitness', 'eco-friendly', 'exercise'],
    inStock: true,
    stockQuantity: 168,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop', alt: 'Yoga mat rolled', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=800&fit=crop', alt: 'Yoga mat in use', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=800&fit=crop', alt: 'Yoga mat detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'purple', name: 'Lavender Purple', value: 'purple', hex: '#8B5CF6', available: true,priceModifier: 0 },
        { id: 'pink', name: 'Coral Pink', value: 'pink', hex: '#EC4899', available: true,priceModifier: 34 },
        { id: 'blue', name: 'Sky Blue', value: 'blue', hex: '#3B82F6', available: true,priceModifier: 54 },
        { id: 'green', name: 'Mint Green', value: 'green', hex: '#10B981', available: true,priceModifier: 78 },
      ],
      materials: [
        { id: 'tpe', name: 'TPE Eco-Friendly', value: 'tpe', available: true, priceModifier: 0 },
        { id: 'nbr', name: 'NBR Premium', value: 'nbr', available: true, priceModifier: 10 },
        { id: 'natural', name: 'Natural Rubber', value: 'natural', available: true, priceModifier: 20 },
      ],
      sizes: [
        { id: '6mm', name: '6mm Thick', value: '6mm', available: true, priceModifier: 0 },
        { id: '8mm', name: '8mm Thick', value: '8mm', available: true, priceModifier: 10 },
        { id: '10mm', name: '10mm Thick', value: '10mm', available: true, priceModifier: 15 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Eco-Friendly TPE' },
      { label: 'Dimensions', value: '72" x 24"' },
      { label: 'Thickness', value: '6mm / 8mm / 10mm' },
      { label: 'Features', value: 'Non-Slip, Alignment Marks' },
    ],
  },
  {
    id: '13',
    name: 'Insulated Travel Tumbler',
    slug: 'travel-tumbler',
    shortDescription: 'Vacuum insulated tumbler keeps drinks cold for 24 hours.',
    description: 'Premium stainless steel travel tumbler with double-wall vacuum insulation. Keeps beverages cold for 24 hours or hot for 12 hours. Leak-proof lid, fits most cup holders. Perfect for commuting and travel.',
    basePrice: 34.99,
    compareAtPrice: 49.99,
    rating: 2,
    reviewCount: 1678,
    category: 'Kitchen & Dining',
    tags: ['tumbler', 'insulated', 'travel', 'stainless steel'],
    inStock: true,
    stockQuantity: 294,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop', alt: 'Travel tumbler', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop', alt: 'Tumbler detail', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1614963366795-83c4fc78f9a6?w=800&h=800&fit=crop', alt: 'Tumbler in car', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Matte Black', value: 'black', hex: '#000000', available: true,priceModifier: 0 },
        { id: 'silver', name: 'Stainless Steel', value: 'silver', hex: '#C0C0C0', available: true,priceModifier: 20 },
        { id: 'rose', name: 'Rose Gold', value: 'rose', hex: '#B76E79', available: true,priceModifier: 25 },
        { id: 'blue', name: 'Navy Blue', value: 'blue', hex: '#1E3A8A', available: true,priceModifier: 35 },
        { id: 'mint', name: 'Mint Green', value: 'mint', hex: '#6EE7B7', available: true, priceModifier: 40 },
      ],
      materials: [
        { id: 'steel', name: 'Stainless Steel', value: 'steel', available: true, priceModifier: 0 },
        { id: 'copper', name: 'Copper Lined', value: 'copper', available: true, priceModifier: 10 },
      ],
      sizes: [
        { id: '20oz', name: '20 oz', value: '20oz', available: true, priceModifier: 0 },
        { id: '30oz', name: '30 oz', value: '30oz', available: true, priceModifier: 8 },
        { id: '40oz', name: '40 oz', value: '40oz', available: true, priceModifier: 15 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Food-Grade Stainless Steel' },
      { label: 'Insulation', value: 'Double-Wall Vacuum' },
      { label: 'Lid', value: 'Leak-Proof' },
      { label: 'Capacity', value: '20oz / 30oz / 40oz' },
    ],
  },
  {
    id: '14',
    name: 'Gaming Mouse Pad XXL',
    slug: 'gaming-mousepad',
    shortDescription: 'Extended gaming mouse pad with smooth surface and anti-slip base.',
    description: 'Level up your gaming setup with our XXL gaming mouse pad. Features ultra-smooth surface for precise tracking, stitched edges to prevent fraying, and non-slip rubber base. Large enough for keyboard and mouse.',
    basePrice: 29.99,
    compareAtPrice: 44.99,
    rating: 5,
    reviewCount: 912,
    category: 'Gaming',
    tags: ['gaming', 'mousepad', 'desk', 'accessories'],
    inStock: true,
    stockQuantity: 256,
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop', alt: 'Gaming mousepad', type: 'image' },
      { id: '2', url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=800&fit=crop', alt: 'Mousepad on desk', type: 'image' },
      { id: '3', url: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800&h=800&fit=crop', alt: 'Mousepad detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'black', name: 'Stealth Black', value: 'black', hex: '#000000', available: true,priceModifier: 0 },
        { id: 'rgb', name: 'RGB Edge', value: 'rgb', hex: '#FF00FF', available: true, priceModifier: 10 },
        { id: 'blue', name: 'Cyberpunk Blue', value: 'blue', hex: '#3B82F6', available: true,priceModifier: 20 },
        { id: 'red', name: 'Dragon Red', value: 'red', hex: '#DC2626', available: true,priceModifier: 25 },
      ],
      materials: [
        { id: 'cloth', name: 'Speed Cloth', value: 'cloth', available: true, priceModifier: 0 },
        { id: 'hybrid', name: 'Hybrid Surface', value: 'hybrid', available: true, priceModifier: 8 },
      ],
      sizes: [
        { id: 'large', name: 'Large (31x15)', value: 'Large', available: true, priceModifier: 0 },
        { id: 'xl', name: 'XL (35x15)', value: 'XL', available: true, priceModifier: 5 },
        { id: 'xxl', name: 'XXL (47x15)', value: 'XXL', available: true, priceModifier: 10 },
      ],
    },
    specifications: [
      { label: 'Surface', value: 'Micro-textured Cloth' },
      { label: 'Base', value: 'Anti-Slip Rubber' },
      { label: 'Edge', value: 'Stitched' },
      { label: 'Thickness', value: '3mm' },
    ],
  },
  {
    id: '16',
    name: 'Wireless Keyboard and Mouse Combo',
    slug: 'wireless-keyboard-mouse-combo',
    description: 'Professional wireless keyboard and mouse combo with ergonomic design and long battery life. Features silent keys, adjustable DPI, and 2.4GHz wireless connectivity.',
    shortDescription: 'Ergonomic wireless keyboard and mouse set',
    basePrice: 79.99,
    compareAtPrice: 119.99,
    rating: 1,
    reviewCount: 892,
    category: 'Electronics',
    tags: ['Wireless', 'Ergonomic', 'Office'],
    inStock: true,
    stockQuantity: 156,
    images: [
      { id: '16-1', url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop', alt: 'Wireless Keyboard and Mouse', type: 'image' },
      { id: '16-2', url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=800&fit=crop', alt: 'Keyboard Close Up', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c16-1', name: 'Black', value: 'Black', available: true, hex: '#000000',priceModifier: 0 },
        { id: 'c16-2', name: 'White', value: 'White', available: true, hex: '#FFFFFF',priceModifier: 30 },
        { id: 'c16-3', name: 'Silver', value: 'Silver', available: true, hex: '#C0C0C0',priceModifier: 56 },
      ],
      materials: [
        { id: 'm16-1', name: 'Standard', value: 'ABS Plastic', available: true },
      ],
      sizes: [
        { id: 's16-1', name: 'Full Size', value: 'Full', available: true },
      ],
    },
    specifications: [
      { label: 'Connectivity', value: '2.4GHz Wireless' },
      { label: 'Battery Life', value: 'Up to 12 months' },
      { label: 'DPI', value: '800-2400 adjustable' },
    ],
  },
  {
    id: '17',
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Premium double-wall vacuum insulated water bottle keeps drinks cold for 24 hours and hot for 12 hours. Made from food-grade stainless steel with leak-proof lid.',
    shortDescription: 'Insulated stainless steel water bottle',
    basePrice: 34.99,
    compareAtPrice: 49.99,
    rating: 2,
    reviewCount: 1456,
    category: 'Home & Kitchen',
    tags: ['Insulated', 'Eco-Friendly', 'BPA-Free'],
    inStock: true,
    stockQuantity: 287,
    images: [
      { id: '17-1', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop', alt: 'Stainless Steel Water Bottle', type: 'image' },
      { id: '17-2', url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=800&fit=crop', alt: 'Water Bottle Detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c17-1', name: 'Matte Black', value: 'Matte Black', available: true, hex: '#1A1A1A', priceModifier: 0 },
        { id: 'c17-2', name: 'Ocean Blue', value: 'Ocean Blue', available: true, hex: '#006994', priceModifier: 20 },
        { id: 'c17-3', name: 'Rose Gold', value: 'Rose Gold', available: true, hex: '#B76E79', priceModifier: 25 },
        { id: 'c17-4', name: 'Forest Green', value: 'Forest Green', available: true, hex: '#228B22', priceModifier: 35 },
      ],
      materials: [
        { id: 'm17-1', name: 'Stainless Steel', value: '18/8 Stainless Steel', available: true },
      ],
      sizes: [
        { id: 's17-1', name: '18oz', value: '18oz', available: true, priceModifier: -5 },
        { id: 's17-2', name: '32oz', value: '32oz', available: true },
        { id: 's17-3', name: '40oz', value: '40oz', available: true, priceModifier: 5 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Food-grade stainless steel' },
      { label: 'Insulation', value: 'Double-wall vacuum' },
      { label: 'Capacity', value: '32oz (1L)' },
    ],
  },
  {
    id: '18',
    name: 'LED Desk Lamp with USB Charging',
    slug: 'led-desk-lamp-usb-charging',
    description: 'Modern LED desk lamp with adjustable brightness, color temperature control, and built-in USB charging port. Features touch control and memory function.',
    shortDescription: 'Adjustable LED desk lamp with charging',
    basePrice: 59.99,
    compareAtPrice: 89.99,
    rating: 3,
    reviewCount: 723,
    category: 'Home & Kitchen',
    tags: ['LED', 'Adjustable', 'USB Charging'],
    inStock: true,
    stockQuantity: 198,
    images: [
      { id: '18-1', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop', alt: 'LED Desk Lamp', type: 'image' },
      { id: '18-2', url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop', alt: 'Desk Lamp Detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c18-1', name: 'White', value: 'White', available: true, hex: '#FFFFFF', priceModifier: 0 },
        { id: 'c18-2', name: 'Black', value: 'Black', available: true, hex: '#000000', priceModifier: 20 },
        { id: 'c18-3', name: 'Silver', value: 'Silver', available: true, hex: '#C0C0C0', priceModifier: 40 },
      ],
      materials: [
        { id: 'm18-1', name: 'Aluminum', value: 'Aluminum Alloy', available: true },
      ],
      sizes: [
        { id: 's18-1', name: 'Standard', value: 'Standard', available: true },
      ],
    },
    specifications: [
      { label: 'Power', value: '12W LED' },
      { label: 'Color Temperature', value: '3000K-6500K' },
      { label: 'USB Port', value: '5V/1A' },
    ],
  },
  {
    id: '19',
    name: 'Mechanical Gaming Keyboard RGB',
    slug: 'mechanical-gaming-keyboard-rgb',
    description: 'Professional mechanical gaming keyboard with RGB backlighting, Cherry MX switches, and programmable keys. Anti-ghosting technology and customizable lighting effects.',
    shortDescription: 'RGB mechanical gaming keyboard',
    basePrice: 129.99,
    compareAtPrice: 179.99,
    rating: 4,
    reviewCount: 1834,
    category: 'Electronics',
    tags: ['Gaming', 'Mechanical', 'RGB'],
    inStock: true,
    stockQuantity: 142,
    images: [
      { id: '19-1', url: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&h=800&fit=crop', alt: 'Mechanical Gaming Keyboard', type: 'image' },
      { id: '19-2', url: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=800&h=800&fit=crop', alt: 'RGB Lighting Detail', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c19-1', name: 'Black', value: 'Black', available: true, hex: '#000000' },
      ],
      materials: [
        { id: 'm19-1', name: 'Red Switch', value: 'Cherry MX Red', available: true },
        { id: 'm19-2', name: 'Blue Switch', value: 'Cherry MX Blue', available: true, priceModifier: 10 },
        { id: 'm19-3', name: 'Brown Switch', value: 'Cherry MX Brown', available: true, priceModifier: 5 },
      ],
      sizes: [
        { id: 's19-1', name: 'Full Size', value: '104 Keys', available: true },
        { id: 's19-2', name: 'TKL', value: '87 Keys', available: true, priceModifier: -20 },
      ],
    },
    specifications: [
      { label: 'Switch Type', value: 'Cherry MX Mechanical' },
      { label: 'Backlighting', value: 'RGB 16.8M colors' },
      { label: 'Connectivity', value: 'USB-C Detachable' },
    ],
  },
  {
    id: '20',
    name: 'Premium Leather Wallet',
    slug: 'premium-leather-wallet',
    description: 'Handcrafted genuine leather wallet with RFID blocking technology. Features multiple card slots, bill compartment, and coin pocket. Slim design fits comfortably in pocket.',
    shortDescription: 'RFID blocking genuine leather wallet',
    basePrice: 49.99,
    compareAtPrice: 79.99,
    rating: 4,
    reviewCount: 967,
    category: 'Accessories',
    tags: ['Leather', 'RFID', 'Handcrafted'],
    inStock: true,
    stockQuantity: 234,
    images: [
      { id: '20-1', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop', alt: 'Premium Leather Wallet', type: 'image' },
      { id: '20-2', url: 'https://images.unsplash.com/photo-1591347723284-fe5dc2c9f0ad?w=800&h=800&fit=crop', alt: 'Wallet Interior', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c20-1', name: 'Dark Brown', value: 'Dark Brown', available: true, hex: '#654321',priceModifier: 0 },
        { id: 'c20-2', name: 'Black', value: 'Black', available: true, hex: '#000000',priceModifier: 25 },
        { id: 'c20-3', name: 'Tan', value: 'Tan', available: true, hex: '#D2B48C',priceModifier: 25 },
      ],
      materials: [
        { id: 'm20-1', name: 'Full Grain Leather', value: 'Full Grain', available: true },
        { id: 'm20-2', name: 'Top Grain Leather', value: 'Top Grain', available: true, priceModifier: -10 },
      ],
      sizes: [
        { id: 's20-1', name: 'Bi-Fold', value: 'Bi-Fold', available: true },
        { id: 's20-2', name: 'Tri-Fold', value: 'Tri-Fold', available: true, priceModifier: 5 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Genuine Leather' },
      { label: 'RFID Protection', value: 'Yes' },
      { label: 'Card Slots', value: '8 slots' },
    ],
  },
  {
    id: '21',
    name: 'Wireless Earbuds Pro',
    slug: 'wireless-earbuds-pro',
    description: 'Premium wireless earbuds with active noise cancellation, transparency mode, and premium sound quality. IPX7 water resistance and 30-hour battery life with charging case.',
    shortDescription: 'ANC wireless earbuds with premium sound',
    basePrice: 149.99,
    compareAtPrice: 229.99,
    rating: 5,
    reviewCount: 2156,
    category: 'Electronics',
    tags: ['Wireless', 'ANC', 'Premium Audio'],
    inStock: true,
    stockQuantity: 189,
    images: [
      { id: '21-1', url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop', alt: 'Wireless Earbuds Pro', type: 'image' },
      { id: '21-2', url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&h=800&fit=crop', alt: 'Earbuds in Case', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c21-1', name: 'Matte Black', value: 'Matte Black', available: true, hex: '#1A1A1A',priceModifier: 0 },
        { id: 'c21-2', name: 'Pearl White', value: 'Pearl White', available: true, hex: '#F8F8F8',priceModifier: 25 },
        { id: 'c21-3', name: 'Midnight Blue', value: 'Midnight Blue', available: true, hex: '#191970',priceModifier: 35 },
      ],
      materials: [
        { id: 'm21-1', name: 'Premium', value: 'Aluminum Case', available: true },
      ],
      sizes: [
        { id: 's21-1', name: 'Universal', value: 'Universal Fit', available: true },
      ],
    },
    specifications: [
      { label: 'ANC', value: 'Active Noise Cancellation' },
      { label: 'Battery', value: '30 hours total' },
      { label: 'Water Resistance', value: 'IPX7' },
    ],
  },
  {
    id: '22',
    name: 'Smart Fitness Tracker Band',
    slug: 'smart-fitness-tracker-band',
    description: 'Advanced fitness tracker with heart rate monitoring, sleep tracking, GPS, and smartphone notifications. Water-resistant design with 7-day battery life.',
    shortDescription: 'Fitness tracker with heart rate monitor',
    basePrice: 89.99,
    compareAtPrice: 129.99,
    rating: 2,
    reviewCount: 1245,
    category: 'Electronics',
    tags: ['Fitness', 'Smart', 'Health'],
    inStock: true,
    stockQuantity: 276,
    images: [
      { id: '22-1', url: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800&h=800&fit=crop', alt: 'Smart Fitness Tracker', type: 'image' },
      { id: '22-2', url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop', alt: 'Fitness Band Display', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c22-1', name: 'Black', value: 'Black', available: true, hex: '#000000',priceModifier: 0 },
        { id: 'c22-2', name: 'Navy Blue', value: 'Navy Blue', available: true, hex: '#000080',priceModifier: 15 },
        { id: 'c22-3', name: 'Rose Pink', value: 'Rose Pink', available: true, hex: '#FF66CC',priceModifier: 24 },
        { id: 'c22-4', name: 'Lime Green', value: 'Lime Green', available: true, hex: '#32CD32',priceModifier: 35 },
      ],
      materials: [
        { id: 'm22-1', name: 'Silicone Band', value: 'Soft Silicone', available: true },
      ],
      sizes: [
        { id: 's22-1', name: 'Small', value: 'S (140-180mm)', available: true },
        { id: 's22-2', name: 'Large', value: 'L (180-220mm)', available: true },
      ],
    },
    specifications: [
      { label: 'Display', value: '1.4" AMOLED' },
      { label: 'Sensors', value: 'Heart Rate, GPS, Accelerometer' },
      { label: 'Battery', value: '7 days' },
    ],
  },
  {
    id: '23',
    name: 'Portable Power Bank 20000mAh',
    slug: 'portable-power-bank-20000mah',
    description: 'High-capacity portable power bank with fast charging support, dual USB outputs, and USB-C input/output. LED display shows remaining battery percentage.',
    shortDescription: 'Fast charging 20000mAh power bank',
    basePrice: 44.99,
    compareAtPrice: 69.99,
    rating: 3,
    reviewCount: 1678,
    category: 'Electronics',
    tags: ['Power Bank', 'Fast Charging', 'Portable'],
    inStock: true,
    stockQuantity: 312,
    images: [
      { id: '23-1', url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop', alt: 'Portable Power Bank', type: 'image' },
      { id: '23-2', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=800&fit=crop', alt: 'Power Bank Display', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c23-1', name: 'Black', value: 'Black', available: true, hex: '#000000',priceModifier: 0 },
        { id: 'c23-2', name: 'White', value: 'White', available: true, hex: '#FFFFFF',priceModifier: 20 },
        { id: 'c23-3', name: 'Blue', value: 'Blue', available: true, hex: '#0000FF',priceModifier: 25 },
      ],
      materials: [
        { id: 'm23-1', name: 'Aluminum', value: 'Aluminum Alloy', available: true },
      ],
      sizes: [
        { id: 's23-1', name: '20000mAh', value: '20000mAh', available: true },
      ],
    },
    specifications: [
      { label: 'Capacity', value: '20000mAh' },
      { label: 'Fast Charging', value: 'PD 3.0, QC 4.0' },
      { label: 'Ports', value: '2x USB-A, 1x USB-C' },
    ],
  },
  {
    id: '24',
    name: 'Professional Camera Backpack',
    slug: 'professional-camera-backpack',
    description: 'Weather-resistant camera backpack with customizable dividers, laptop compartment, and quick-access side pocket. Fits DSLR with multiple lenses and accessories.',
    shortDescription: 'Weather-resistant DSLR camera backpack',
    basePrice: 119.99,
    compareAtPrice: 179.99,
    rating: 5,
    reviewCount: 845,
    category: 'Accessories',
    tags: ['Camera', 'Photography', 'Backpack'],
    inStock: true,
    stockQuantity: 128,
    images: [
      { id: '24-1', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop', alt: 'Professional Camera Backpack', type: 'image' },
      { id: '24-2', url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop', alt: 'Camera Backpack Interior', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c24-1', name: 'Black', value: 'Black', available: true, hex: '#000000',priceModifier: 0 },
        { id: 'c24-2', name: 'Charcoal Gray', value: 'Charcoal Gray', available: true, hex: '#36454F',priceModifier: 15 },
      ],
      materials: [
        { id: 'm24-1', name: 'Waterproof Nylon', value: 'Waterproof Nylon', available: true },
      ],
      sizes: [
        { id: 's24-1', name: 'Standard', value: 'Standard (30L)', available: true ,priceModifier: 0},
        { id: 's24-2', name: 'Large', value: 'Large (40L)', available: true, priceModifier: 20 },
      ],
    },
    specifications: [
      { label: 'Material', value: 'Waterproof Nylon' },
      { label: 'Laptop', value: 'Fits up to 15.6"' },
      { label: 'Capacity', value: '30 liters' },
    ],
  },
  {
    id: '25',
    name: 'Electric Standing Desk Converter',
    slug: 'electric-standing-desk-converter',
    description: 'Motorized standing desk converter with memory presets, USB charging ports, and cable management. Transforms any desk into an adjustable height workstation.',
    shortDescription: 'Motorized sit-stand desk converter',
    basePrice: 299.99,
    compareAtPrice: 449.99,
    rating: 2,
    reviewCount: 567,
    category: 'Furniture',
    tags: ['Standing Desk', 'Ergonomic', 'Electric'],
    inStock: true,
    stockQuantity: 87,
    images: [
      { id: '25-1', url: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&h=800&fit=crop', alt: 'Electric Standing Desk Converter', type: 'image' },
      { id: '25-2', url: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&h=800&fit=crop', alt: 'Standing Desk Setup', type: 'image' },
    ],
    variants: {
      colors: [
        { id: 'c25-1', name: 'Black', value: 'Black', available: true, hex: '#000000',priceModifier: 0 },
        { id: 'c25-2', name: 'White', value: 'White', available: true, hex: '#FFFFFF',priceModifier: 15 },
        { id: 'c25-3', name: 'Walnut', value: 'Walnut', available: true, hex: '#5C4033',priceModifier: 30 },
      ],
      materials: [
        { id: 'm25-1', name: 'Steel Frame', value: 'Steel Frame', available: true },
      ],
      sizes: [
        { id: 's25-1', name: '32"', value: '32" Wide', available: true, priceModifier: 0 },
        { id: 's25-2', name: '42"', value: '42" Wide', available: true,priceModifier: 20 },
        { id: 's25-3', name: '48"', value: '48" Wide', available: true, priceModifier: 30 },
      ],
    },
    specifications: [
      { label: 'Height Range', value: '6.5" to 19.5"' },
      { label: 'Weight Capacity', value: '33 lbs' },
      { label: 'Memory Presets', value: '4 positions' },
    ],
  },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find(product => product.id === id);
};

// Helper function to get featured products
export const getFeaturedProducts = (limit: number = 6): Product[] => {
  return MOCK_PRODUCTS.slice(0, limit);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return MOCK_PRODUCTS.filter(product => product.category === category);
};

// Helper function to sort products
export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low-high':
      return sorted.sort((a, b) => a.basePrice - b.basePrice);
    
    case 'price-high-low':
      return sorted.sort((a, b) => b.basePrice - a.basePrice);
    
    case 'newest':
      return sorted.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
    
    case 'best-rated':
      return sorted.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.reviewCount - a.reviewCount;
        }
        return b.rating - a.rating;
      });
    
    case 'most-popular':
      return sorted.sort((a, b) => {
        const popularityA = (a.popularity || 0) + (a.reviewCount * 0.5);
        const popularityB = (b.popularity || 0) + (b.reviewCount * 0.5);
        return popularityB - popularityA;
      });
    
    case 'featured':
    default:
      return sorted;
  }
};
