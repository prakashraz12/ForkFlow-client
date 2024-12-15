
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, MapPin } from 'lucide-react'

// Leaflet icon configuration
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
})

interface RestaurantProfileProps {
  name: string
  description: string
  bannerImage: string
  profileImage: string
  phone: string
  email: string
  address: string
  coordinates: [number, number] // [latitude, longitude]
}

export default function RestaurantProfile({
  name = 'Saino Restauratn and huest house',
  description = 'apologize for the error. Let revise the code to address this issue. The error "Cannot read properties of undefined (reading)',
  bannerImage = 'https://res.cloudinary.com/du1bbws62/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1730554580/yxa3gwhhecwto29qlyg1.jpg',
  profileImage = 'https://res.cloudinary.com/du1bbws62/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1730554580/yxa3gwhhecwto29qlyg1.jpg',
  phone = '9841421937',
  email = 'rzprakash16@gmail.com',
  address = 'fhulikhel,kavre',
  coordinates = [51.505, -0.09]
}: RestaurantProfileProps) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="overflow-hidden">
        <div className="relative h-48 md:h-64">
          {bannerImage && (
            <img
              src={bannerImage}
              alt={`${name} banner`}
            
              className='object-cover'
            />
          )}
        </div>
        <CardContent className="relative pt-16 pb-8 px-4">
          <Avatar className="absolute -top-16 left-4 w-32 h-32 border-4 border-white">
            {profileImage && <AvatarImage src={profileImage} alt={name} />}
            <AvatarFallback>{name ? name[0].toUpperCase() : 'R'}</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold mb-2">{name}</h1>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {phone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{email}</span>
                </div>
              )}
              {address && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                  <span>{address}</span>
                </div>
              )}
            </div>
            {coordinates[0] !== 0 && coordinates[1] !== 0 && (
              <div className="h-48 md:h-64">
                <MapContainer 
                  center={coordinates} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={coordinates}>
                    <Popup>{name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}