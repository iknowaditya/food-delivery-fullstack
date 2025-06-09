import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Bike, Utensils } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icons
const createCustomIcon = (icon, color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" 
           style="background: ${color};">
        ${icon}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
};

const DeliveryCoverage = () => {
  const mapRef = useRef(null);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const animationRef = useRef(null);

  const deliveryRoute = [
    [51.505, -0.09], // Restaurant location
    [51.51, -0.1], // Midpoint 1
    [51.515, -0.09], // Midpoint 2
    [51.52, -0.095], // Customer location
  ];

  const statusUpdates = [
    {
      icon: <Utensils className="w-5 h-5 text-white" />,
      title: "Order Prepared",
      time: "2:45 PM",
      description: "Your food is being carefully prepared by our chefs",
    },
    {
      icon: <Bike className="w-5 h-5 text-white" />,
      title: "On The Way",
      time: "3:00 PM",
      description: "Your order is on its way with our delivery partner",
    },
    {
      icon: <MapPin className="w-5 h-5 text-white" />,
      title: "Estimated Delivery",
      time: "3:30 PM",
      description: "Your food will arrive shortly at your location",
    },
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([51.505, -0.09], 14);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Restaurant Marker
    const restaurantIcon = createCustomIcon(
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M3 8h18v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path><line x1="3" y1="12" x2="21" y2="12"></line></svg>',
      "linear-gradient(135deg, #10b981, #059669)"
    );

    L.marker([51.505, -0.09], {
      icon: restaurantIcon,
    })
      .addTo(map)
      .bindPopup("<b>Our Restaurant</b><br>123 Food Street");

    // Customer Marker
    const customerIcon = createCustomIcon(
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
      "linear-gradient(135deg, #3b82f6, #2563eb)"
    );

    L.marker([51.52, -0.095], {
      icon: customerIcon,
    })
      .addTo(map)
      .bindPopup("<b>Delivery Location</b><br>456 Customer Ave");

    // Route Line
    const routeLine = L.polyline(deliveryRoute, {
      color: "#10b981",
      weight: 4,
      dashArray: "10, 10",
      lineJoin: "round",
    }).addTo(map);

    // Fit bounds to show entire route
    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

    // Delivery Bike Marker
    const bikeIcon = L.divIcon({
      className: "bike-marker",
      html: `
        <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl transform rotate-0">
          <div class="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M5 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm14 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM5 14l1-2h4l3-4 3 6h2"></path>
            </svg>
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
    });

    const bikeMarker = L.marker(deliveryRoute[0], { icon: bikeIcon }).addTo(
      map
    );

    // Animation function
    const animateBike = () => {
      let startTime = null;
      const duration = 10000; // 10 seconds for full animation
      const totalDistance = deliveryRoute.length - 1;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate current segment
        const segmentProgress = progress * totalDistance;
        const segmentIndex = Math.floor(segmentProgress);
        const segmentRatio = segmentProgress - segmentIndex;

        if (segmentIndex < deliveryRoute.length - 1) {
          const start = deliveryRoute[segmentIndex];
          const end = deliveryRoute[segmentIndex + 1];
          const lat = start[0] + (end[0] - start[0]) * segmentRatio;
          const lng = start[1] + (end[1] - start[1]) * segmentRatio;
          bikeMarker.setLatLng([lat, lng]);

          // Rotate bike based on direction
          const angle =
            Math.atan2(end[1] - start[1], end[0] - start[0]) * (180 / Math.PI);
          bikeMarker.setIcon(
            L.divIcon({
              ...bikeIcon.options,
              html: bikeIcon.options.html.replace(
                "transform rotate-0",
                `transform rotate-${angle}`
              ),
            })
          );

          // Update status based on progress
          if (segmentProgress < 0.33) {
            setCurrentStatus(0);
          } else if (segmentProgress < 0.66) {
            setCurrentStatus(1);
          } else {
            setCurrentStatus(2);
          }

          setDeliveryProgress(progress * 100);
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete, reset after delay
          setTimeout(() => {
            bikeMarker.setLatLng(deliveryRoute[0]);
            setCurrentStatus(0);
            setDeliveryProgress(0);
            setTimeout(() => {
              animationRef.current = requestAnimationFrame(animate);
            }, 1000);
          }, 3000);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a delay
    const animationTimeout = setTimeout(animateBike, 1000);

    return () => {
      clearTimeout(animationTimeout);
      cancelAnimationFrame(animationRef.current);
      map.remove();
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-[#99f2c8] to-[#f8f9f4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1f4037] mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-800">
              Live Delivery Tracking
            </span>
          </h2>
          <p className="text-lg text-[#1f4037cc] max-w-2xl mx-auto">
            Watch your order travel from our kitchen to your doorstep in
            real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="relative rounded-2xl overflow-hidden shadow-xl border border-[#99f2c8] h-96 lg:h-[500px]"
          >
            <div
              ref={mapRef}
              className="absolute inset-0 z-0 rounded-2xl"
              style={{ backgroundColor: "#f8fafc" }}
            />

            {/* Progress indicator */}
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#ffffffdd] backdrop-blur-sm px-4 py-3 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#1f4037] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Delivery in progress
                  </span>
                </div>
                <span className="text-sm font-medium text-[#1f4037]">
                  {Math.round(deliveryProgress)}% complete
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-[#1f4037] h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${deliveryProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Status Updates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-[#99f2c8] shadow-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Delivery Status
              </h3>

              <div className="space-y-4">
                {statusUpdates.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`relative pl-10 pb-6 ${
                      index < statusUpdates.length - 1 ? "border-l-2" : ""
                    } ${
                      index <= currentStatus
                        ? "border-emerald-500"
                        : "border-[#99f2c8]"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div
                      className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center -ml-3 ${
                        index <= currentStatus
                          ? "bg-emerald-500 text-white"
                          : "bg-[#f8f9f4] text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4
                        className={`text-lg font-medium ${
                          index <= currentStatus
                            ? "text-gray-800"
                            : "text-gray-500"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`text-sm ${
                          index <= currentStatus
                            ? "text-[#1f4037]"
                            : "text-gray-400"
                        }`}
                      >
                        {item.time}
                      </p>
                      {index === currentStatus && (
                        <motion.p
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-[#1f4037cc] mt-1"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </div>
                    {index === currentStatus && (
                      <div className="absolute -left-1 top-6 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
              <h4 className="font-medium text-gray-800 mb-4">
                Delivery Details
              </h4>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#1f4037cc]">Restaurant:</span>
                  <span className="font-medium">123 Food Street</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1f4037cc]">Destination:</span>
                  <span className="font-medium">456 Customer Ave</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1f4037cc]">Distance:</span>
                  <span className="font-medium">2.5 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1f4037cc]">Estimated Time:</span>
                  <span className="font-medium text-[#1f4037]">
                    {currentStatus === 2 ? "Arriving now" : "15-20 min"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-white hover:bg-gray-50 text-[#1f4037] rounded-lg font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center border border-emerald-200">
                  <Clock className="mr-2 w-4 h-4" />
                  Order History
                </button>
                <button className="flex-1 py-3 bg-gradient-to-r from-[#99f2c8] to-[#1f4037] hover:from-[#1f4037] hover:to-[#99f2c8]  text-white rounded-lg font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center">
                  <MapPin className="mr-2 w-4 h-4" />
                  Live Tracking
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryCoverage;
