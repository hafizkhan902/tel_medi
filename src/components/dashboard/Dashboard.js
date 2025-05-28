import React, { useState, useRef, useEffect } from 'react';
// Removed unused imports to fix linting warnings
// import { formatDateTime, getAppointmentStatusColor } from './functions';
import './Dashboard.css';

function Dashboard({ onSignOut }) {
  const [activeSection, setActiveSection] = useState('ai-chat');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      content: 'Hello! I\'m your AI healthcare assistant. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // Prescription state
  // eslint-disable-next-line no-unused-vars -- will be used in future implementation
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'RX12345',
      date: new Date(2023, 5, 15).toISOString(),
      diagnosis: 'Seasonal Allergic Rhinitis',
      status: 'approved',
      medications: [
        { name: 'Loratadine', dosage: '10mg', frequency: 'Once daily', duration: '14 days' },
        { name: 'Fluticasone Nasal Spray', dosage: '50mcg', frequency: 'Twice daily', duration: '14 days' }
      ],
      doctor: {
        name: 'Dr. Sarah Johnson',
        specialty: 'Allergy & Immunology',
        approved: true,
        approvalDate: new Date(2023, 5, 16).toISOString()
      },
      pharmacy: {
        name: 'MediCare Pharmacy',
        address: '123 Health St, Medical District',
        status: 'delivered',
        deliveryDate: new Date(2023, 5, 17).toISOString()
      },
      notes: 'Take with food. Avoid known allergens. Follow up in two weeks if symptoms persist.'
    },
    {
      id: 'RX12346',
      date: new Date(2023, 6, 2).toISOString(),
      diagnosis: 'Acute Bronchitis',
      status: 'pending',
      medications: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' },
        { name: 'Dextromethorphan', dosage: '30mg', frequency: 'Every 6-8 hours as needed', duration: '7 days' }
      ],
      doctor: {
        name: 'Awaiting Doctor Review',
        specialty: 'General Medicine',
        approved: false,
        approvalDate: null
      },
      pharmacy: {
        name: 'Not yet assigned',
        address: '',
        status: 'waiting',
        deliveryDate: null
      },
      notes: 'AI-generated prescription awaiting doctor approval. Rest and increase fluid intake recommended.'
    },
    {
      id: 'RX12347',
      date: new Date(2023, 6, 20).toISOString(),
      diagnosis: 'Tension Headache',
      status: 'in-review',
      medications: [
        { name: 'Acetaminophen', dosage: '500mg', frequency: 'Every 6 hours as needed', duration: '3 days' },
        { name: 'Cyclobenzaprine', dosage: '5mg', frequency: 'Once daily at bedtime', duration: '5 days' }
      ],
      doctor: {
        name: 'Dr. Michael Lee',
        specialty: 'Neurology',
        approved: false,
        approvalDate: null
      },
      pharmacy: {
        name: 'Not yet assigned',
        address: '',
        status: 'waiting',
        deliveryDate: null
      },
      notes: 'Currently under doctor review. Prescription may be modified.'
    }
  ]);
  
  // Appointment state
  const [appointments, setAppointments] = useState([
    {
      id: 'APT1001',
      doctorName: 'Dr. Emily Wilson',
      specialty: 'General Practitioner',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      time: '10:00 AM',
      duration: 30,
      type: 'video',
      status: 'confirmed',
      notes: 'Follow-up on recent medication changes'
    },
    {
      id: 'APT1002',
      doctorName: 'Dr. James Chen',
      specialty: 'Dermatologist',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      time: '2:30 PM',
      duration: 45,
      type: 'in-person',
      status: 'confirmed',
      notes: 'Skin condition assessment'
    },
    {
      id: 'APT1003',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Allergy & Immunology',
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
      time: '11:15 AM',
      duration: 30,
      type: 'video',
      status: 'pending',
      notes: 'Seasonal allergy follow-up'
    }
  ]);
  
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptionView, setPrescriptionView] = useState('list'); // 'list' or 'detail'
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentView, setAppointmentView] = useState('list'); // 'list', 'detail', 'type-selection', 'new'
  const [appointmentType, setAppointmentType] = useState(null); // 'diagnosis' or 'doctor'
  
  // Location state for appointment
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [unions, setUnions] = useState([]);
  
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazilla, setSelectedUpazilla] = useState('');
  const [selectedUnion, setSelectedUnion] = useState('');
  
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  
  // Add this state for diagnostic centers after other state variables
  const [diagnosticCenters, setDiagnosticCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [referenceNote, setReferenceNote] = useState('');
  const [appointmentStep, setAppointmentStep] = useState(1); // 1: Location, 2: Center, 3: DateTime
  
  // Add reason state after other appointment state variables
  const [reasonForVisit, setReasonForVisit] = useState('');
  
  // Add this with other state variables at the top of the component
  const [appointmentDate, setAppointmentDate] = useState('');
  
  // Add medical records state and functions
  const [medicalRecords, setMedicalRecords] = useState([
    {
      id: 'MR1001',
      title: 'Complete Blood Count (CBC)',
      category: 'Hematology',
      date: new Date(2023, 4, 10).toISOString(),
      doctor: 'Dr. Emily Wilson',
      hospital: 'City Medical Center',
      status: 'normal',
      notes: 'All values within normal range. No abnormalities detected.'
    },
    {
      id: 'MR1002',
      title: 'Electrocardiogram (ECG)',
      category: 'Cardiology',
      date: new Date(2023, 3, 25).toISOString(),
      doctor: 'Dr. Michael Lee',
      hospital: 'Heart Care Specialists',
      status: 'abnormal',
      notes: 'Minor irregularities detected. Follow-up recommended in 3 months.'
    },
    {
      id: 'MR1003',
      title: 'Blood Glucose Test',
      category: 'Endocrinology',
      date: new Date(2023, 5, 5).toISOString(),
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Diabetes Care Clinic',
      status: 'normal',
      notes: 'Fasting glucose levels normal. Continue current diet plan.'
    },
    {
      id: 'MR1004',
      title: 'MRI Scan - Brain',
      category: 'Neurology',
      date: new Date(2023, 2, 18).toISOString(),
      doctor: 'Dr. James Chen',
      hospital: 'Neuro Health Institute',
      status: 'pending',
      notes: 'Scan completed. Awaiting radiologist review and final report.'
    },
    {
      id: 'MR1005',
      title: 'Lipid Profile',
      category: 'Cardiology',
      date: new Date(2023, 4, 28).toISOString(),
      doctor: 'Dr. Michael Lee',
      hospital: 'Heart Care Specialists',
      status: 'caution',
      notes: 'LDL cholesterol slightly elevated. Dietary adjustments recommended.'
    },
    {
      id: 'MR1006',
      title: 'Thyroid Function Test',
      category: 'Endocrinology',
      date: new Date(2023, 5, 12).toISOString(),
      doctor: 'Dr. Sarah Johnson',
      hospital: 'Endocrine Wellness Center',
      status: 'normal',
      notes: 'Thyroid hormone levels within normal range.'
    },
    {
      id: 'MR1007',
      title: 'X-Ray - Chest',
      category: 'Radiology',
      date: new Date(2023, 1, 15).toISOString(),
      doctor: 'Dr. Robert Kim',
      hospital: 'City Medical Center',
      status: 'normal',
      notes: 'Lungs clear. No abnormalities detected.'
    }
  ]);

  const [recordFilterCategory, setRecordFilterCategory] = useState('all');
  const [recordSearchTerm, setRecordSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [recordView, setRecordView] = useState('list'); // 'list' or 'detail'

  // Filter medical records based on category and search term
  const filteredMedicalRecords = medicalRecords.filter(record => {
    const matchesCategory = recordFilterCategory === 'all' || record.category.toLowerCase() === recordFilterCategory.toLowerCase();
    const matchesSearch = record.title.toLowerCase().includes(recordSearchTerm.toLowerCase()) || 
                          record.doctor.toLowerCase().includes(recordSearchTerm.toLowerCase()) ||
                          record.hospital.toLowerCase().includes(recordSearchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // View record details
  const viewRecordDetail = (id) => {
    const record = medicalRecords.find(r => r.id === id);
    setSelectedRecord(record);
    setRecordView('detail');
  };

  // Back to records list
  const backToRecordsList = () => {
    setRecordView('list');
    setSelectedRecord(null);
  };

  // Get status class for record status display
  const getRecordStatusClass = (status) => {
    switch (status) {
      case 'normal':
        return 'status-normal';
      case 'abnormal':
        return 'status-abnormal';
      case 'caution':
        return 'status-caution';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };
  
  // Fetch divisions on component mount
  useEffect(() => {
    fetchDivisions();
  }, []);
  
  // Fetch districts when division is selected
  useEffect(() => {
    if (selectedDivision) {
      fetchDistricts(selectedDivision);
      // Reset child selections when parent changes
      setSelectedDistrict('');
      setSelectedUpazilla('');
      setSelectedUnion('');
      setUpazillas([]);
      setUnions([]);
    }
  }, [selectedDivision]);
  
  // Fetch upazillas when district is selected
  useEffect(() => {
    if (selectedDistrict) {
      console.log("District selected, fetching upazillas:", selectedDistrict);
      fetchUpazillas(selectedDistrict);
      // Reset child selections when parent changes
      setSelectedUpazilla('');
      setSelectedUnion('');
      setUnions([]);
    }
  }, [selectedDistrict]);
  
  // Fetch unions when upazilla is selected
  useEffect(() => {
    if (selectedUpazilla) {
      console.log("Upazilla selected, fetching unions:", selectedUpazilla);
      fetchUnions(selectedUpazilla);
      // Reset child selection
      setSelectedUnion('');
    }
  }, [selectedUpazilla]);
  
  // Fetch all divisions
  const fetchDivisions = async () => {
    setIsLoadingLocations(true);
    try {
      console.log('Fetching divisions from API...');
      const response = await fetch('https://bdapi.vercel.app/api/v.1/division');
      console.log('Raw API response status:', response.status);
      
      const data = await response.json();
      console.log('API response data:', data);
      
      // Check the actual structure of the data
      if (data && data.data && Array.isArray(data.data)) {
        console.log('Setting divisions from data.data array');
        setDivisions(data.data);
      } else if (Array.isArray(data)) {
        console.log('Setting divisions from direct array');
        setDivisions(data);
      } else {
        console.error('Division data is not in expected format:', data);
        setDivisions([]); // Set to empty array if not valid
      }
    } catch (error) {
      console.error('Error fetching divisions:', error);
      setDivisions([]); // Set to empty array on error
    } finally {
      setIsLoadingLocations(false);
    }
  };
  
  // Fetch districts by division ID
  const fetchDistricts = async (divisionId) => {
    setIsLoadingLocations(true);
    try {
      console.log(`Fetching districts for division ID: ${divisionId}`);
      const response = await fetch(`https://bdapi.vercel.app/api/v.1/district/${divisionId}`);
      console.log('Raw API response status:', response.status);
      
      const data = await response.json();
      console.log('District API response data:', data);
      
      // Check the actual structure of the data
      if (data && data.data && Array.isArray(data.data)) {
        console.log('Setting districts from data.data array');
        setDistricts(data.data);
      } else if (Array.isArray(data)) {
        console.log('Setting districts from direct array');
        setDistricts(data);
      } else {
        console.error('District data is not in expected format:', data);
        setDistricts([]); // Set to empty array if not valid
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
      setDistricts([]); // Set to empty array on error
    } finally {
      setIsLoadingLocations(false);
    }
  };
  
  // Fetch upazillas by district ID
  const fetchUpazillas = async (districtId) => {
    setIsLoadingLocations(true);
    try {
      console.log(`Fetching upazillas for district ID: ${districtId}`);
      // Use the correct API endpoint for upazillas
      const response = await fetch(`https://bdapi.vercel.app/api/v.1/upazilla/${districtId}`);
      console.log('Raw API response status:', response.status);
      
      const data = await response.json();
      console.log('Upazilla API response data:', data);
      
      // Check the actual structure of the data
      if (data && data.data && Array.isArray(data.data)) {
        console.log('Setting upazillas from data.data array');
        setUpazillas(data.data);
      } else if (Array.isArray(data)) {
        console.log('Setting upazillas from direct array');
        setUpazillas(data);
      } else {
        console.error('Upazilla data is not in expected format:', data);
        setUpazillas([]); // Set to empty array if not valid
      }
    } catch (error) {
      console.error('Error fetching upazillas:', error);
      setUpazillas([]); // Set to empty array on error
    } finally {
      setIsLoadingLocations(false);
    }
  };
  
  // Fetch unions by upazilla ID
  const fetchUnions = async (upazillaId) => {
    setIsLoadingLocations(true);
    try {
      console.log(`Fetching unions for upazilla ID: ${upazillaId}`);
      // Use the correct API endpoint for unions
      const response = await fetch(`https://bdapi.vercel.app/api/v.1/union/${upazillaId}`);
      console.log('Raw API response status:', response.status);
      
      const data = await response.json();
      console.log('Union API response data:', data);
      
      // Check the actual structure of the data
      if (data && data.data && Array.isArray(data.data)) {
        console.log('Setting unions from data.data array');
        setUnions(data.data);
      } else if (Array.isArray(data)) {
        console.log('Setting unions from direct array');
        setUnions(data);
      } else {
        console.error('Union data is not in expected format:', data);
        setUnions([]); // Set to empty array if not valid
      }
    } catch (error) {
      console.error('Error fetching unions:', error);
      setUnions([]); // Set to empty array on error
    } finally {
      setIsLoadingLocations(false);
    }
  };
  
  // Go to appointment type selection
  const goToAppointmentTypeSelection = () => {
    setAppointmentView('type-selection');
    setAppointmentType(null);
  };
  
  // Select appointment type and proceed to form
  const selectAppointmentType = (type) => {
    setAppointmentType(type);
    setAppointmentView('new');
  };
  
  // Add this function to fetch diagnostic centers based on location
  const fetchDiagnosticCenters = () => {
    // In a real app, this would be an API call based on the selected location
    console.log("Fetching diagnostic centers for:", {
      division: selectedDivision,
      district: selectedDistrict,
      upazilla: selectedUpazilla,
      union: selectedUnion
    });
    
    // Mock data - in real app this would be from API
    const mockCenters = [
      { id: 'dc1', name: 'City Medical Center', address: 'Main Street', rating: 4.5 },
      { id: 'dc2', name: 'Community Healthcare', address: 'Park Avenue', rating: 4.2 },
      { id: 'dc3', name: 'Metro Diagnostics', address: 'Central Road', rating: 4.7 },
      { id: 'dc4', name: 'Family Care Center', address: 'Hospital Lane', rating: 4.0 },
      { id: 'dc5', name: 'Modern Diagnostic Lab', address: 'Health Complex', rating: 4.8 }
    ];
    
    setDiagnosticCenters(mockCenters);
    setAppointmentStep(2); // Move to center selection
  };
  
  // Add this function to handle center selection
  const handleCenterSelection = (centerId) => {
    setSelectedCenter(centerId);
    setAppointmentStep(3); // Move to date/time selection
  };
  
  // Modify the location form submission
  const handleLocationSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDivision || !selectedDistrict || !selectedUpazilla || !selectedUnion) {
      alert("Please select all location fields");
      return;
    }
    
    fetchDiagnosticCenters();
  };
  
  // Update the appointment submission handler
  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    
    if (!appointmentDate) {
      alert("Please select an appointment date");
      return;
    }
    
    // In a real app, you would send this data to your backend
    const formData = {
      type: appointmentType,
      division: selectedDivision,
      district: selectedDistrict,
      upazilla: selectedUpazilla,
      union: selectedUnion,
      diagnosticCenter: selectedCenter,
      reference: referenceNote,
      reason: reasonForVisit,
      date: appointmentDate,
      time: document.getElementById('appointment-time').value,
    };
    
    console.log('Form data submitted:', formData);
    
    // Create a new appointment object and add it to the appointments array
    const newAppointment = {
      id: `APT${Math.floor(1000 + Math.random() * 9000)}`,
      doctorName: appointmentType === 'diagnosis' ? 'AI Diagnosis' : 'Dr. To Be Assigned',
      specialty: appointmentType === 'diagnosis' ? 'AI Health Analysis' : 'Based on symptoms',
      date: new Date(appointmentDate).toISOString(), // Use the selected date
      time: document.getElementById('appointment-time').value || '10:00 AM',
      duration: 30,
      type: appointmentType === 'diagnosis' ? 'online' : 'in-person',
      status: 'pending',
      notes: 'Appointment request submitted. Waiting for confirmation.',
      location: {
        division: selectedDivision,
        district: selectedDistrict,
        upazilla: selectedUpazilla,
        union: selectedUnion
      },
      center: diagnosticCenters.find(c => c.id === selectedCenter),
      reference: referenceNote,
      reason: reasonForVisit
    };
    
    setAppointments([...appointments, newAppointment]);
    
    // Reset form and go back to list view
    setSelectedDivision('');
    setSelectedDistrict('');
    setSelectedUpazilla('');
    setSelectedUnion('');
    setSelectedCenter('');
    setReferenceNote('');
    setReasonForVisit('');
    setAppointmentDate('');
    setAppointmentStep(1);
    setAppointmentView('list');
  };
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      sender: 'user',
      content: inputText,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setInputText('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        sender: 'ai',
        content: 'I\'m analyzing your symptoms. Could you provide more details about how you\'re feeling?',
        timestamp: new Date().toISOString()
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate starting voice recording
      setInputText(inputText + "[Voice recording started...]");
      // In a real app, you would implement actual voice recording functionality here
    } else {
      // Simulate stopping voice recording
      setInputText(inputText.replace("[Voice recording started...]", "[Voice message recorded]"));
      // In a real app, you would process the recorded voice here
    }
  };

  const toggleVideoCall = () => {
    setIsVideoActive(!isVideoActive);
    if (!isVideoActive) {
      // Add a system message about video call
      const systemMessage = {
        sender: 'system',
        content: 'Video consultation requested. Connecting to AI health assistant...',
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, systemMessage]);
      
      // Simulate AI joining video call
      setTimeout(() => {
        const aiResponse = {
          sender: 'ai',
          content: 'I\'ve joined the video consultation. I can see you now. How can I help with your health concerns today?',
          timestamp: new Date().toISOString()
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1500);
    } else {
      // Add a system message about ending video call
      const systemMessage = {
        sender: 'system',
        content: 'Video consultation ended.',
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, systemMessage]);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
    if (!isCameraActive) {
      // Add a system message about camera activation
      const systemMessage = {
        sender: 'system',
        content: 'Camera activated. You can now take a photo to share with the AI.',
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, systemMessage]);
    } else {
      // Simulate taking a photo and sending it
      const userMessage = {
        sender: 'user',
        content: '[Image captured and sent]',
        timestamp: new Date().toISOString(),
        hasImage: true
      };
      setMessages([...messages, userMessage]);
      
      // Simulate AI response to the image
      setTimeout(() => {
        const aiResponse = {
          sender: 'ai',
          content: 'I\'ve received your image. Based on what I can see, it appears to be a mild skin irritation. Can you tell me if it\'s itchy or painful?',
          timestamp: new Date().toISOString()
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1500);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const onFileSelected = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const fileName = files[0].name;
      
      // Add a user message with the file
      const userMessage = {
        sender: 'user',
        content: `[File uploaded: ${fileName}]`,
        timestamp: new Date().toISOString(),
        hasFile: true,
        fileName: fileName
      };
      setMessages([...messages, userMessage]);
      
      // Simulate AI response to the file
      setTimeout(() => {
        const aiResponse = {
          sender: 'ai',
          content: `I've received your file "${fileName}". I'll analyze this and get back to you shortly.`,
          timestamp: new Date().toISOString()
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1000);
    }
    // Clear the input so the same file can be uploaded again if needed
    e.target.value = '';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get day of week for appointment
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // View prescription details
  const viewPrescriptionDetail = (id) => {
    const prescription = prescriptions.find(p => p.id === id);
    setSelectedPrescription(prescription);
    setPrescriptionView('detail');
  };

  // Return to prescription list
  const backToPrescriptionList = () => {
    setPrescriptionView('list');
    setSelectedPrescription(null);
  };

  // View appointment details
  const viewAppointmentDetail = (id) => {
    const appointment = appointments.find(a => a.id === id);
    setSelectedAppointment(appointment);
    setAppointmentView('detail');
  };

  // Back to appointment list
  const backToAppointmentList = () => {
    setAppointmentView('list');
    setSelectedAppointment(null);
  };

  // Go to new appointment form
  const goToNewAppointment = () => {
    setAppointmentView('new');
  };

  // Handle appointment cancellation
  const handleCancelAppointment = (id) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' } : apt
      )
    );
    setAppointmentView('list');
    setSelectedAppointment(null);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'in-review':
        return 'status-in-review';
      case 'rejected':
        return 'status-rejected';
      case 'delivered':
        return 'status-delivered';
      case 'processing':
        return 'status-processing';
      case 'shipping':
        return 'status-shipping';
      default:
        return '';
    }
  };

  // Get appointment status color
  const getAppointmentStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  // Add this function to handle division selection with logging
  const handleDivisionChange = (e) => {
    const value = e.target.value;
    console.log(`Division selected: ${value}`);
    setSelectedDivision(value);
  };

  // Add this function to handle district selection with logging
  const handleDistrictChange = (e) => {
    const value = e.target.value;
    console.log(`District selected: ${value}`);
    setSelectedDistrict(value);
  };

  // Add this function to handle upazilla selection with logging
  const handleUpazillaChange = (e) => {
    const value = e.target.value;
    console.log(`Upazilla selected: ${value}`);
    setSelectedUpazilla(value);
  };

  // Add this function to handle union selection with logging
  const handleUnionChange = (e) => {
    const value = e.target.value;
    console.log(`Union selected: ${value}`);
    setSelectedUnion(value);
  };

  // Add patient profile state
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      dateOfBirth: '1985-06-15',
      bloodType: 'O+',
      height: 175, // cm
      weight: 70, // kg
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      address: '123 Health Street, Medical District, NY 10001'
    },
    medical: {
      allergies: ['Penicillin', 'Peanuts'],
      chronicConditions: ['Hypertension', 'Asthma'],
      medications: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
        { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' }
      ],
      surgeries: [
        { procedure: 'Appendectomy', date: '2010-03-22', hospital: 'General Hospital' },
        { procedure: 'Knee Arthroscopy', date: '2018-11-15', hospital: 'Orthopedic Center' }
      ]
    },
    insurance: {
      provider: 'HealthGuard Insurance',
      policyNumber: 'HG-12345678',
      groupNumber: 'GRP-987654',
      coverageType: 'Family',
      expiryDate: '2024-12-31'
    },
    emergencyContacts: [
      { name: 'Jane Doe', relationship: 'Spouse', phone: '+1 (555) 987-6543' },
      { name: 'Michael Doe', relationship: 'Brother', phone: '+1 (555) 456-7890' }
    ]
  });

  const [activeProfileTab, setActiveProfileTab] = useState('personal');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfileData, setEditedProfileData] = useState({...profileData});

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    // Height in meters, weight in kg
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { category: 'Underweight', color: '#3b82f6' }; // Blue
    if (bmiValue < 25) return { category: 'Normal', color: '#10b981' }; // Green
    if (bmiValue < 30) return { category: 'Overweight', color: '#f59e0b' }; // Amber
    return { category: 'Obese', color: '#ef4444' }; // Red
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Handle profile edit start
  const handleEditProfile = () => {
    setEditedProfileData({...profileData});
    setIsEditingProfile(true);
  };

  // Handle profile edit cancel
  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  // Handle profile edit save
  const handleSaveProfile = () => {
    setProfileData({...editedProfileData});
    setIsEditingProfile(false);
    // In a real app, you would send this data to your backend
    console.log('Profile data saved:', editedProfileData);
  };

  // Handle profile data change during edit
  const handleProfileChange = (section, field, value) => {
    setEditedProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle nested profile data change (for arrays of objects)
  const handleNestedProfileChange = (section, arrayName, index, field, value) => {
    setEditedProfileData(prev => {
      const updatedArray = [...prev[section][arrayName]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: value
      };
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [arrayName]: updatedArray
        }
      };
    });
  };

  // Add pharmacy state after other state variables
  const [pharmacies, setPharmacies] = useState([
    {
      id: 'PHR001',
      name: 'MediCare Pharmacy',
      address: '123 Health Street, Medical District',
      phone: '+1 (555) 789-0123',
      logo: 'MC',
      rating: 4.7,
      distance: '1.2 km',
      orders: [
        {
          id: 'ORD12345',
          date: new Date(2023, 6, 10).toISOString(),
          status: 'delivered',
          totalAmount: 45.80,
          items: [
            { name: 'Lisinopril', quantity: 30, strength: '10mg', price: 12.50 },
            { name: 'Metformin', quantity: 60, strength: '500mg', price: 15.30 },
            { name: 'Vitamin D', quantity: 90, strength: '1000 IU', price: 18.00 }
          ]
        },
        {
          id: 'ORD12389',
          date: new Date(2023, 7, 15).toISOString(),
          status: 'processing',
          totalAmount: 32.50,
          items: [
            { name: 'Amoxicillin', quantity: 20, strength: '500mg', price: 22.50 },
            { name: 'Ibuprofen', quantity: 30, strength: '200mg', price: 10.00 }
          ]
        }
      ]
    },
    {
      id: 'PHR002',
      name: 'Community Pharmacy',
      address: '456 Wellness Ave, Health District',
      phone: '+1 (555) 456-7890',
      logo: 'CP',
      rating: 4.5,
      distance: '2.5 km',
      orders: [
        {
          id: 'ORD23456',
          date: new Date(2023, 5, 22).toISOString(),
          status: 'delivered',
          totalAmount: 67.25,
          items: [
            { name: 'Atorvastatin', quantity: 30, strength: '20mg', price: 25.75 },
            { name: 'Omeprazole', quantity: 30, strength: '20mg', price: 18.50 },
            { name: 'Multivitamin', quantity: 60, strength: 'Daily', price: 23.00 }
          ]
        }
      ]
    },
    {
      id: 'PHR003',
      name: 'City Medical Pharmacy',
      address: '789 Treatment Lane, Care Center',
      phone: '+1 (555) 234-5678',
      logo: 'CMP',
      rating: 4.9,
      distance: '0.8 km',
      orders: [
        {
          id: 'ORD34567',
          date: new Date(2023, 7, 5).toISOString(),
          status: 'shipped',
          totalAmount: 58.40,
          items: [
            { name: 'Levothyroxine', quantity: 90, strength: '75mcg', price: 32.40 },
            { name: 'Folic Acid', quantity: 30, strength: '1mg', price: 8.00 },
            { name: 'Calcium + D3', quantity: 60, strength: '600mg', price: 18.00 }
          ]
        },
        {
          id: 'ORD34592',
          date: new Date(2023, 8, 1).toISOString(),
          status: 'pending',
          totalAmount: 42.60,
          items: [
            { name: 'Escitalopram', quantity: 30, strength: '10mg', price: 24.60 },
            { name: 'Melatonin', quantity: 60, strength: '5mg', price: 18.00 }
          ]
        }
      ]
    }
  ]);
  
  const [pharmacyView, setPharmacyView] = useState('list'); // 'list' or 'detail'
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailsView, setOrderDetailsView] = useState(false);
  
  // View pharmacy details
  const viewPharmacyDetail = (id) => {
    const pharmacy = pharmacies.find(p => p.id === id);
    setSelectedPharmacy(pharmacy);
    setPharmacyView('detail');
    setOrderDetailsView(false);
  };
  
  // Back to pharmacy list
  const backToPharmacyList = () => {
    setPharmacyView('list');
    setSelectedPharmacy(null);
    setOrderDetailsView(false);
  };
  
  // View order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOrderDetailsView(true);
  };
  
  // Back to orders list
  const backToOrdersList = () => {
    setOrderDetailsView(false);
    setSelectedOrder(null);
  };
  
  // Get order status class for styling
  const getOrderStatusClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'status-delivered';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Left sidebar navigation */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">
            <h2><span className="ai-text">AI</span>MediCare</h2>
          </div>
        </div>
        
        <div className="user-profile-brief">
          <div className="user-avatar">
            <span>JD</span>
          </div>
          <div className="user-info">
            <h3>John Doe</h3>
            <p>Patient ID: #12345</p>
          </div>
        </div>
        
        <nav className="dashboard-nav">
          <ul>
            <li className={activeSection === 'ai-chat' ? 'active' : ''} onClick={() => setActiveSection('ai-chat')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
              </svg>
              <span>AI Diagnosis</span>
            </li>
            <li className={activeSection === 'appointments' ? 'active' : ''} onClick={() => setActiveSection('appointments')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Appointments</span>
            </li>
            <li className={activeSection === 'prescriptions' ? 'active' : ''} onClick={() => setActiveSection('prescriptions')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h7m4-8h-3M1 19l3 3 3-3M6 11v.01M2 8v.01M4 15v.01"></path>
                <path d="M20 8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z"></path>
              </svg>
              <span>Prescriptions</span>
            </li>
            <li className={activeSection === 'pharmacy' ? 'active' : ''} onClick={() => setActiveSection('pharmacy')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3h6v4H9zM9 7l3 13 3-13"></path>
              </svg>
              <span>Pharmacy</span>
            </li>
            <li className={activeSection === 'medical-records' ? 'active' : ''} onClick={() => setActiveSection('medical-records')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
              <span>Medical Records</span>
            </li>
            <li className={activeSection === 'profile' ? 'active' : ''} onClick={() => setActiveSection('profile')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profile</span>
            </li>
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="signout-button" onClick={onSignOut}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="dashboard-main">
        {activeSection === 'ai-chat' && (
          <div className="ai-chat-section">
            <div className="ai-chat-container">
              <div className="chat-sidebar">
                <div className="chat-header">
                  <h2>AI Diagnosis Assistant</h2>
                  <div className="ai-status">
                    <span className="status-dot active"></span>
                    <span>AI Assistant Active</span>
                  </div>
                </div>
                
                <div className="diagnosis-status">
                  <h3>Current Diagnosis Status</h3>
                  <div className="status-items">
                    <div className="status-item">
                      <div className="status-label">AI Analysis:</div>
                      <div className="status-value">In Progress</div>
                      <div className="progress-bar">
                        <div className="progress" style={{width: '35%'}}></div>
                      </div>
                    </div>
                    <div className="status-item">
                      <div className="status-label">Doctor Review:</div>
                      <div className="status-value">Waiting</div>
                    </div>
                    <div className="status-item">
                      <div className="status-label">Expected Completion:</div>
                      <div className="status-value">~15 minutes</div>
                    </div>
                  </div>
                </div>
                
                <div className="conversation-settings">
                  <h3>Conversation Settings</h3>
                  <div className="settings-options">
                    <button className="settings-option">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      <span>New Diagnosis</span>
                    </button>
                    <button className="settings-option">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <span>Export Chat</span>
                    </button>
                    <button className="settings-option">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span>Request Specialist</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="chat-main">
                {isVideoActive && (
                  <div className="video-conference-container">
                    <div className="video-stream ai-stream">
                      <div className="video-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
                        </svg>
                        <span>AI Health Assistant</span>
                      </div>
                    </div>
                    <div className="video-stream user-stream">
                      <div className="video-placeholder user">
                        <span>You</span>
                      </div>
                    </div>
                    <div className="video-controls">
                      <button className="video-control-btn mute">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" y1="19" x2="12" y2="23"></line>
                          <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                      </button>
                      <button className="video-control-btn camera">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                      </button>
                      <button className="video-control-btn end-call" onClick={toggleVideoCall}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.5 20.5 3 13l7.5-7.5"></path>
                          <path d="m13.5 20.5 7.5-7.5-7.5-7.5"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                
                {isCameraActive && (
                  <div className="camera-capture-container">
                    <div className="camera-preview">
                      <div className="camera-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                          <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        <span>Camera Preview</span>
                      </div>
                    </div>
                    <div className="camera-controls">
                      <button className="capture-photo" onClick={toggleCamera}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        Capture Photo
                      </button>
                      <button className="cancel-photo" onClick={() => setIsCameraActive(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="chat-container">
                  <div className="chat-messages-wrapper">
                    <div className="chat-messages" id="chat-messages">
                      {messages.map((message, index) => (
                        <div 
                          key={index} 
                          className={`chat-message ${message.sender === 'ai' ? 'ai' : message.sender === 'user' ? 'user' : 'system'}`}
                        >
                          {message.sender === 'ai' && (
                            <div className="message-avatar ai-avatar">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
                              </svg>
                            </div>
                          )}
                          {message.sender === 'system' && (
                            <div className="message-avatar system-avatar">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                              </svg>
                            </div>
                          )}
                          <div className="message-content">
                            <div className="message-text">
                              {message.content}
                              {message.hasImage && (
                                <div className="message-image-preview">
                                  <div className="image-placeholder">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                      <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                    <span>Image</span>
                                  </div>
                                </div>
                              )}
                              {message.hasFile && (
                                <div className="message-file-preview">
                                  <div className="file-placeholder">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                      <polyline points="14 2 14 8 20 8"></polyline>
                                      <line x1="16" y1="13" x2="8" y2="13"></line>
                                      <line x1="16" y1="17" x2="8" y2="17"></line>
                                      <polyline points="10 9 9 9 8 9"></polyline>
                                    </svg>
                                    <span>{message.fileName}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="message-time">{formatTime(message.timestamp)}</div>
                          </div>
                          {message.sender === 'user' && (
                            <div className="message-avatar user-avatar">
                              <span>JD</span>
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  <form className="chat-input" onSubmit={handleSendMessage}>
                    <div className="input-wrapper">
                      <input 
                        type="text" 
                        placeholder="Describe your symptoms or ask a question..." 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                      />
                      <div className="input-actions">
                        <div className="media-options">
                          <button 
                            type="button" 
                            className={`media-option-btn ${isCameraActive ? 'active' : ''}`} 
                            onClick={toggleCamera}
                            title="Take a photo"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                              <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                          </button>
                          <button 
                            type="button" 
                            className={`media-option-btn ${isRecording ? 'active' : ''}`} 
                            onClick={toggleVoiceRecording}
                            title="Voice recording"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                              <line x1="12" y1="19" x2="12" y2="23"></line>
                              <line x1="8" y1="23" x2="16" y2="23"></line>
                            </svg>
                          </button>
                          <button 
                            type="button" 
                            className="media-option-btn" 
                            onClick={handleFileUpload}
                            title="Upload a file"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              style={{ display: 'none' }} 
                              onChange={onFileSelected}
                            />
                          </button>
                          <button 
                            type="button" 
                            className={`media-option-btn ${isVideoActive ? 'active' : ''}`} 
                            onClick={toggleVideoCall}
                            title="Video call"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="23 7 16 12 23 17 23 7"></polygon>
                              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                          </button>
                        </div>
                        <button type="submit" className="send-button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'prescriptions' && (
          <div className="prescriptions-section">
            <div className="section-header">
              <h2>My Prescriptions</h2>
              <div className="section-actions">
                <div className="search-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input type="text" placeholder="Search prescriptions..." />
                </div>
                <div className="filter-options">
                  <select>
                    <option value="all">All Prescriptions</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="in-review">In Review</option>
                  </select>
                </div>
              </div>
            </div>
            
            {prescriptionView === 'list' ? (
              <div className="prescriptions-list">
                {prescriptions.map(prescription => (
                  <div key={prescription.id} className="prescription-card" onClick={() => viewPrescriptionDetail(prescription.id)}>
                    <div className="prescription-header">
                      <div className="prescription-id">{prescription.id}</div>
                      <div className={`prescription-status ${getStatusColor(prescription.status)}`}>
                        {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                      </div>
                    </div>
                    <div className="prescription-body">
                      <h3 className="prescription-diagnosis">{prescription.diagnosis}</h3>
                      <div className="prescription-date">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{formatDate(prescription.date)}</span>
                      </div>
                      <div className="prescription-medications">
                        <h4>Medications:</h4>
                        <ul>
                          {prescription.medications.map((med, index) => (
                            <li key={index}>{med.name} - {med.dosage}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="prescription-footer">
                        <div className="doctor-info">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <span>{prescription.doctor.name}</span>
                        </div>
                        <button className="view-details-btn">
                          View Details
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prescription-detail">
                {selectedPrescription && (
                  <>
                    <div className="detail-header">
                      <button className="back-button" onClick={backToPrescriptionList}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Prescriptions
                      </button>
                      <div className="prescription-actions">
                        <button className="action-button print">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                          </svg>
                          Print
                        </button>
                        <button className="action-button download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          Download
                        </button>
                      </div>
                    </div>
                    
                    <div className="prescription-detail-content">
                      <div className="prescription-overview">
                        <div className="prescription-header-detail">
                          <h2>{selectedPrescription.diagnosis}</h2>
                          <div className={`prescription-status ${getStatusColor(selectedPrescription.status)}`}>
                            {selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1)}
                          </div>
                        </div>
                        <div className="prescription-meta">
                          <div className="meta-item">
                            <span className="label">Prescription ID:</span>
                            <span className="value">{selectedPrescription.id}</span>
                          </div>
                          <div className="meta-item">
                            <span className="label">Date Issued:</span>
                            <span className="value">{formatDate(selectedPrescription.date)}</span>
                          </div>
                          {selectedPrescription.doctor.approvalDate && (
                            <div className="meta-item">
                              <span className="label">Date Approved:</span>
                              <span className="value">{formatDate(selectedPrescription.doctor.approvalDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="prescription-sections">
                        <div className="prescription-section medications">
                          <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 5H7a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h7m4-8h-3M1 19l3 3 3-3M6 11v.01M2 8v.01M4 15v.01"></path>
                              <path d="M20 8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2Z"></path>
                            </svg>
                            Medications
                          </h3>
                          <div className="medications-list">
                            {selectedPrescription.medications.map((med, index) => (
                              <div key={index} className="medication-item">
                                <div className="medication-name">{med.name}</div>
                                <div className="medication-details">
                                  <span className="dosage">{med.dosage}</span>
                                  <span className="separator">•</span>
                                  <span className="frequency">{med.frequency}</span>
                                  <span className="separator">•</span>
                                  <span className="duration">{med.duration}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="prescription-section doctor">
                          <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Doctor Information
                          </h3>
                          <div className="doctor-details">
                            <div className="doctor-name">{selectedPrescription.doctor.name}</div>
                            {selectedPrescription.doctor.specialty && (
                              <div className="doctor-specialty">{selectedPrescription.doctor.specialty}</div>
                            )}
                            <div className="approval-status">
                              {selectedPrescription.doctor.approved ? (
                                <div className="approved">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                  </svg>
                                  Approved
                                </div>
                              ) : (
                                <div className="pending-approval">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                  </svg>
                                  Awaiting Approval
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="prescription-section pharmacy">
                          <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 3h6v4H9zM9 7l3 13 3-13"></path>
                            </svg>
                            Pharmacy & Delivery
                          </h3>
                          <div className="pharmacy-details">
                            <div className="pharmacy-name">{selectedPrescription.pharmacy.name}</div>
                            {selectedPrescription.pharmacy.address && (
                              <div className="pharmacy-address">{selectedPrescription.pharmacy.address}</div>
                            )}
                            <div className="delivery-status">
                              <div className={`status ${getStatusColor(selectedPrescription.pharmacy.status)}`}>
                                {selectedPrescription.pharmacy.status === 'delivered' ? (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    Delivered on {formatDate(selectedPrescription.pharmacy.deliveryDate)}
                                  </>
                                ) : (
                                  <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    {selectedPrescription.pharmacy.status.charAt(0).toUpperCase() + selectedPrescription.pharmacy.status.slice(1)}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="prescription-section notes">
                          <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <path d="M14 2v6h6"></path>
                              <path d="M16 13H8"></path>
                              <path d="M16 17H8"></path>
                              <path d="M10 9H8"></path>
                            </svg>
                            Notes & Instructions
                          </h3>
                          <div className="notes-content">
                            {selectedPrescription.notes}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'appointments' && (
          <div className="appointments-section">
            <div className="section-header">
              <h2>My Appointments</h2>
              <div className="section-actions">
                {appointmentView === 'list' && (
                  <button className="primary-button" onClick={goToAppointmentTypeSelection}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Schedule New Appointment
                  </button>
                )}
                {appointmentView !== 'list' && (
                  <button className="back-button" onClick={backToAppointmentList}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Appointments
                  </button>
                )}
              </div>
            </div>
            
            {appointmentView === 'type-selection' && (
              <div className="appointment-type-selection">
                <h3>Select Appointment Type</h3>
                <p>Please choose the type of appointment you'd like to schedule:</p>
                
                <div className="appointment-types">
                  <div className="appointment-type-card" onClick={() => selectAppointmentType('diagnosis')}>
                    <div className="type-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
                      </svg>
                    </div>
                    <h4>AI Diagnosis</h4>
                    <p>Get an initial AI-powered diagnosis of your symptoms and connect with a doctor for verification.</p>
                    <ul className="type-features">
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Immediate AI analysis
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Doctor verification within hours
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Digital prescription if needed
                      </li>
                    </ul>
                    <button className="select-type-btn">
                      Select AI Diagnosis
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="appointment-type-card" onClick={() => selectAppointmentType('doctor')}>
                    <div className="type-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h4>Doctor Appointment</h4>
                    <p>Schedule a direct appointment with a doctor for in-person consultation at a nearby clinic.</p>
                    <ul className="type-features">
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        In-person medical examination
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Choose from nearby clinics
                      </li>
                      <li>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Physical prescription and follow-up
                      </li>
                    </ul>
                    <button className="select-type-btn">
                      Select Doctor Appointment
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {appointmentView === 'list' && (
              <div className="appointments-list">
                <div className="upcoming-label">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <h3>Upcoming Appointments</h3>
                </div>
                
                {appointments.filter(apt => apt.status !== 'cancelled').length === 0 ? (
                  <div className="no-appointments">
                    <p>You have no upcoming appointments scheduled.</p>
                    <button className="secondary-button" onClick={goToNewAppointment}>Schedule an Appointment</button>
                  </div>
                ) : (
                  <div className="appointment-cards">
                    {appointments
                      .filter(apt => apt.status !== 'cancelled')
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map(appointment => (
                        <div key={appointment.id} className="appointment-card" onClick={() => viewAppointmentDetail(appointment.id)}>
                          <div className="appointment-type-indicator">
                            {appointment.type === 'video' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                              </svg>
                            )}
                          </div>
                          <div className="appointment-info">
                            <div className="appointment-date-time">
                              <div className="appointment-day">{getDayOfWeek(appointment.date)}</div>
                              <div className="appointment-date">{formatDate(appointment.date)}</div>
                              <div className="appointment-time">{appointment.time} • {appointment.duration} min</div>
                            </div>
                            <div className="appointment-details">
                              <h4>{appointment.doctorName}</h4>
                              <div className="appointment-specialty">{appointment.specialty}</div>
                              <div className={`appointment-status ${getAppointmentStatusClass(appointment.status)}`}>
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </div>
                            </div>
                            <div className="appointment-action">
                              <button className="view-button">
                                View Details
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="5" y1="12" x2="19" y2="12"></line>
                                  <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                
                {appointments.filter(apt => apt.status === 'cancelled').length > 0 && (
                  <div className="cancelled-appointments">
                    <div className="cancelled-label">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                      <h3>Cancelled Appointments</h3>
                    </div>
                    <div className="appointment-cards cancelled">
                      {appointments
                        .filter(apt => apt.status === 'cancelled')
                        .map(appointment => (
                          <div key={appointment.id} className="appointment-card cancelled">
                            <div className="appointment-date-time">
                              <div className="appointment-date">{formatDate(appointment.date)}</div>
                              <div className="appointment-time">{appointment.time}</div>
                            </div>
                            <div className="appointment-details">
                              <h4>{appointment.doctorName}</h4>
                              <div className="appointment-specialty">{appointment.specialty}</div>
                              <div className="appointment-status status-cancelled">Cancelled</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {appointmentView === 'detail' && selectedAppointment && (
              <div className="appointment-detail">
                <div className="appointment-detail-card">
                  <div className="appointment-header">
                    <h3>Appointment Details</h3>
                    <div className={`appointment-status-badge ${getAppointmentStatusClass(selectedAppointment.status)}`}>
                      {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="appointment-body">
                    <div className="appointment-datetime-card">
                      <div className="date-box">
                        <div className="month">{new Date(selectedAppointment.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                        <div className="day">{new Date(selectedAppointment.date).getDate()}</div>
                        <div className="year">{new Date(selectedAppointment.date).getFullYear()}</div>
                      </div>
                      <div className="time-details">
                        <div className="day-name">{getDayOfWeek(selectedAppointment.date)}</div>
                        <div className="time-slot">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{selectedAppointment.time} • {selectedAppointment.duration} minutes</span>
                        </div>
                        <div className="appointment-type">
                          {selectedAppointment.type === 'video' ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                              </svg>
                              <span>Video Consultation</span>
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                              </svg>
                              <span>In-Person Visit</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Add diagnostic center information if available */}
                    {selectedAppointment.center && (
                      <div className="center-info-card">
                        <h4>Diagnostic Center</h4>
                        <div className="center-profile">
                          <div className="center-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <line x1="3" y1="9" x2="21" y2="9"></line>
                              <line x1="9" y1="21" x2="9" y2="9"></line>
                            </svg>
                          </div>
                          <div className="center-details">
                            <div className="center-name">{selectedAppointment.center.name}</div>
                            <div className="center-address">{selectedAppointment.center.address}</div>
                            {selectedAppointment.center.rating && (
                              <div className="center-rating">
                                <span className="stars">
                                  {'★'.repeat(Math.floor(selectedAppointment.center.rating))}
                                  {selectedAppointment.center.rating % 1 !== 0 ? '½' : ''}
                                  {'☆'.repeat(5 - Math.ceil(selectedAppointment.center.rating))}
                                </span>
                                <span className="rating-number">{selectedAppointment.center.rating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="doctor-info-card">
                      <h4>Doctor Information</h4>
                      <div className="doctor-profile">
                        <div className="doctor-avatar">
                          <span>{selectedAppointment.doctorName.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="doctor-details">
                          <div className="doctor-name">{selectedAppointment.doctorName}</div>
                          <div className="doctor-specialty">{selectedAppointment.specialty}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Add reference notes if available */}
                    {selectedAppointment.reference && (
                      <div className="appointment-reference">
                        <h4>Reference/Referral Information</h4>
                        <p>{selectedAppointment.reference}</p>
                      </div>
                    )}
                    
                    {selectedAppointment.notes && (
                      <div className="appointment-notes">
                        <h4>Appointment Notes</h4>
                        <p>{selectedAppointment.notes}</p>
                      </div>
                    )}
                    
                    {selectedAppointment.reason && (
                      <div className="appointment-reason">
                        <h4>Reason for Visit</h4>
                        <p>{selectedAppointment.reason}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="appointment-actions">
                    {selectedAppointment.type === 'video' && selectedAppointment.status === 'confirmed' && (
                      <button className="action-button join-call">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="23 7 16 12 23 17 23 7"></polygon>
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                        Join Video Call
                      </button>
                    )}
                    {selectedAppointment.status === 'confirmed' && (
                      <button className="action-button reschedule">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 2v6h-6"></path>
                          <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                          <path d="M3 22v-6h6"></path>
                          <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                        </svg>
                        Reschedule
                      </button>
                    )}
                    {selectedAppointment.status === 'confirmed' && (
                      <button 
                        className="action-button cancel" 
                        onClick={() => handleCancelAppointment(selectedAppointment.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {appointmentView === 'new' && (
              <div className="new-appointment-form">
                <div className="form-card">
                  <h3>{appointmentType === 'diagnosis' ? 'Schedule AI Diagnosis' : 'Schedule Doctor Appointment'}</h3>
                  <p className="form-instruction">Please fill out the form below to request an appointment.</p>
                  
                  <form onSubmit={handleAppointmentSubmit}>
                    <div className="appointment-type-indicator">
                      <div className={`selected-type ${appointmentType === 'diagnosis' ? 'diagnosis' : 'doctor'}`}>
                        {appointmentType === 'diagnosis' ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 2 17.5v-10a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 1 0v-.5a2.5 2.5 0 1 1 5 0v10a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-1 0v.5a2.5 2.5 0 1 1-5 0v-5a.5.5 0 0 0-1 0v5a2.5 2.5 0 0 1-4.96.44"></path>
                            </svg>
                            AI Diagnosis
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Doctor Appointment
                          </>
                        )}
                      </div>
                      <button 
                        type="button" 
                        className="change-type-btn"
                        onClick={goToAppointmentTypeSelection}
                      >
                        Change
                      </button>
                    </div>
                    
                    <div className="form-section location-section">
                      <h4>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Your Location
                      </h4>
                      <p className="location-description">
                        {appointmentType === 'diagnosis' 
                          ? 'Please provide your location to find nearby diagnostic centers.'
                          : 'Please select your location to find the nearest available clinics for your appointment.'
                        }
                      </p>
                      
                      {appointmentStep === 1 && (
                        <>
                          <div className="location-selectors">
                            <div className="location-field">
                              <label>Division</label>
                              <select 
                                value={selectedDivision} 
                                onChange={handleDivisionChange}
                                required
                              >
                                <option value="">-- Select Division --</option>
                                {Array.isArray(divisions) && divisions.map(division => (
                                  <option key={division.id || division._id || division.divisionId} value={division.id || division._id || division.divisionId}>
                                    {division.name || division.divisionName || division.division_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div className="location-field">
                              <label>District</label>
                              <select 
                                value={selectedDistrict} 
                                onChange={handleDistrictChange}
                                disabled={!selectedDivision || districts.length === 0}
                                required
                              >
                                <option value="">-- Select District --</option>
                                {Array.isArray(districts) && districts.map(district => (
                                  <option key={district.id || district._id || district.districtId} value={district.id || district._id || district.districtId}>
                                    {district.name || district.districtName || district.district_name}
                                  </option>
                                ))}
                              </select>
                              {isLoadingLocations && !districts.length && <div className="loading-spinner"></div>}
                            </div>
                            
                            <div className="location-field">
                              <label>Upazilla (Sub-district)</label>
                              <select 
                                value={selectedUpazilla} 
                                onChange={handleUpazillaChange}
                                disabled={!selectedDistrict || upazillas.length === 0}
                                required
                              >
                                <option value="">-- Select Upazilla --</option>
                                {Array.isArray(upazillas) && upazillas.map(upazilla => (
                                  <option key={upazilla.id || upazilla._id || upazilla.upazilaId} value={upazilla.id || upazilla._id || upazilla.upazilaId}>
                                    {upazilla.name || upazilla.upazilaName || upazilla.upazila_name}
                                  </option>
                                ))}
                              </select>
                              {isLoadingLocations && !upazillas.length && <div className="loading-spinner"></div>}
                            </div>
                            
                            <div className="location-field">
                              <label>Union</label>
                              <select 
                                value={selectedUnion} 
                                onChange={handleUnionChange}
                                disabled={!selectedUpazilla || unions.length === 0}
                                required
                              >
                                <option value="">-- Select Union --</option>
                                {Array.isArray(unions) && unions.map(union => (
                                  <option key={union.id || union._id || union.unionId} value={union.id || union._id || union.unionId}>
                                    {union.name || union.unionName || union.union_name}
                                  </option>
                                ))}
                              </select>
                              {isLoadingLocations && !unions.length && <div className="loading-spinner"></div>}
                            </div>
                          </div>
                          
                          <div className="form-actions">
                            <button type="button" className="secondary-button" onClick={backToAppointmentList}>
                              Back
                            </button>
                            <button 
                              type="button" 
                              className="primary-button" 
                              onClick={handleLocationSubmit}
                              disabled={!selectedDivision || !selectedDistrict || !selectedUpazilla || !selectedUnion}
                            >
                              Find Diagnostic Centers
                            </button>
                          </div>
                        </>
                      )}
                      
                      {/* Diagnostic Center Selection Step */}
                      {appointmentStep === 2 && (
                        <div className="diagnostic-centers">
                          <h3>Select a Diagnostic Center</h3>
                          <p>Choose from these available centers in your area:</p>
                          
                          <div className="centers-list">
                            {diagnosticCenters.map(center => (
                              <div 
                                key={center.id} 
                                className={`center-card ${selectedCenter === center.id ? 'selected' : ''}`}
                                onClick={() => handleCenterSelection(center.id)}
                              >
                                <div className="center-info">
                                  <h4>{center.name}</h4>
                                  <p className="center-address">{center.address}</p>
                                  <div className="center-rating">
                                    <span className="stars">
                                      {'★'.repeat(Math.floor(center.rating))}
                                      {center.rating % 1 !== 0 ? '½' : ''}
                                      {'☆'.repeat(5 - Math.ceil(center.rating))}
                                    </span>
                                    <span className="rating-number">{center.rating.toFixed(1)}</span>
                                  </div>
                                </div>
                                <div className="center-select">
                                  <button className="select-center-btn">
                                    Select Center
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="5" y1="12" x2="19" y2="12"></line>
                                      <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="form-actions">
                            <button type="button" className="secondary-button" onClick={() => setAppointmentStep(1)}>
                              Back to Location
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Date and Time Selection Step */}
                      {appointmentStep === 3 && (
                        <div className="date-time-section">
                          <h3>Select Date and Time</h3>
                          <p>Choose your preferred appointment schedule:</p>
                          
                          <div className="form-section">
                            <h4>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              Appointment Date & Time
                            </h4>
                            <div className="date-time-selector">
                              <div className="date-input">
                                <label>Date</label>
                                <input 
                                  type="date" 
                                  required 
                                  min={new Date().toISOString().split('T')[0]} 
                                  value={appointmentDate}
                                  onChange={(e) => setAppointmentDate(e.target.value)}
                                />
                              </div>
                              <div className="time-input">
                                <label>Time</label>
                                <select id="appointment-time" required>
                                  <option value="">-- Select Time --</option>
                                  <option value="9:00 AM">9:00 AM</option>
                                  <option value="9:30 AM">9:30 AM</option>
                                  <option value="10:00 AM">10:00 AM</option>
                                  <option value="10:30 AM">10:30 AM</option>
                                  <option value="11:00 AM">11:00 AM</option>
                                  <option value="11:30 AM">11:30 AM</option>
                                  <option value="1:00 PM">1:00 PM</option>
                                  <option value="1:30 PM">1:30 PM</option>
                                  <option value="2:00 PM">2:00 PM</option>
                                  <option value="2:30 PM">2:30 PM</option>
                                  <option value="3:00 PM">3:00 PM</option>
                                  <option value="3:30 PM">3:30 PM</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          
                          <div className="form-section">
                            <h4>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <path d="M14 2v6h6"></path>
                                <path d="M16 13H8"></path>
                                <path d="M16 17H8"></path>
                                <path d="M10 9H8"></path>
                              </svg>
                              Reason for Visit
                            </h4>
                            <div className="reason-input">
                              <textarea 
                                placeholder={appointmentType === 'diagnosis' 
                                  ? "Please describe your symptoms in detail for AI analysis..." 
                                  : "Please describe your symptoms or reason for the appointment..."
                                }
                                value={reasonForVisit}
                                onChange={(e) => setReasonForVisit(e.target.value)}
                                required
                              ></textarea>
                            </div>
                          </div>
                          
                          <div className="form-section">
                            <h4>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                              Reference (Optional)
                            </h4>
                            <div className="reference-input">
                              <textarea 
                                placeholder="Add any reference notes or doctor referral information if applicable"
                                value={referenceNote}
                                onChange={(e) => setReferenceNote(e.target.value)}
                              ></textarea>
                            </div>
                          </div>
                          
                          <div className="form-actions">
                            <button type="button" className="secondary-button" onClick={() => setAppointmentStep(2)}>
                              Back to Centers
                            </button>
                            <button type="submit" className="primary-button">
                              {appointmentType === 'diagnosis' ? 'Request AI Diagnosis' : 'Request Appointment'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'pharmacy' && (
          <div className="pharmacy-section">
            <div className="section-header">
              <h2>My Pharmacies</h2>
              <div className="section-actions">
                <div className="search-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input type="text" placeholder="Search pharmacies..." />
                </div>
              </div>
            </div>
            
            {pharmacyView === 'list' ? (
              <div className="pharmacies-container">
                <h3 className="section-subheader">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3h6v4H9zM9 7l3 13 3-13"></path>
                  </svg>
                  Recent Pharmacies
                </h3>
                
                <div className="pharmacy-cards">
                  {pharmacies.map(pharmacy => (
                    <div key={pharmacy.id} className="pharmacy-card" onClick={() => viewPharmacyDetail(pharmacy.id)}>
                      <div className="pharmacy-logo">
                        <span>{pharmacy.logo}</span>
                      </div>
                      <div className="pharmacy-info">
                        <h4>{pharmacy.name}</h4>
                        <div className="pharmacy-address">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          <span>{pharmacy.address}</span>
                        </div>
                        <div className="pharmacy-contact">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          <span>{pharmacy.phone}</span>
                        </div>
                      </div>
                      <div className="pharmacy-meta">
                        <div className="pharmacy-rating">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                          <span>{pharmacy.rating.toFixed(1)}</span>
                        </div>
                        <div className="pharmacy-distance">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{pharmacy.distance}</span>
                        </div>
                        <div className="pharmacy-orders">
                          <span>{pharmacy.orders.length} orders</span>
                        </div>
                      </div>
                      <div className="pharmacy-action">
                        <button className="view-details-btn">
                          View Orders
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pharmacy-detail">
                {selectedPharmacy && !orderDetailsView ? (
                  <>
                    <div className="detail-header">
                      <button className="back-button" onClick={backToPharmacyList}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Pharmacies
                      </button>
                    </div>
                    
                    <div className="pharmacy-detail-header">
                      <div className="pharmacy-detail-logo">
                        <span>{selectedPharmacy.logo}</span>
                      </div>
                      <div className="pharmacy-detail-info">
                        <h3>{selectedPharmacy.name}</h3>
                        <div className="pharmacy-detail-meta">
                          <div className="detail-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>{selectedPharmacy.address}</span>
                          </div>
                          <div className="detail-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>{selectedPharmacy.phone}</span>
                          </div>
                          <div className="detail-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span>{selectedPharmacy.rating.toFixed(1)} Rating</span>
                          </div>
                          <div className="detail-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>{selectedPharmacy.distance} away</span>
                          </div>
                        </div>
                      </div>
                      <div className="pharmacy-detail-actions">
                        <button className="action-button call">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                          Call Pharmacy
                        </button>
                        <button className="action-button directions">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                          </svg>
                          Get Directions
                        </button>
                      </div>
                    </div>
                    
                    <div className="orders-section">
                      <h3>Order History</h3>
                      <div className="orders-table-wrapper">
                        <table className="orders-table">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Date</th>
                              <th>Status</th>
                              <th>Amount</th>
                              <th>Items</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPharmacy.orders.length === 0 ? (
                              <tr className="no-orders">
                                <td colSpan="6">No orders from this pharmacy</td>
                              </tr>
                            ) : (
                              selectedPharmacy.orders.map(order => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>{formatDate(order.date)}</td>
                                  <td>
                                    <span className={`order-status ${getOrderStatusClass(order.status)}`}>
                                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                  </td>
                                  <td>${order.totalAmount.toFixed(2)}</td>
                                  <td>{order.items.length} items</td>
                                  <td className="order-actions">
                                    <button
                                      className="action-btn view"
                                      onClick={() => viewOrderDetails(order)}
                                      title="View Details"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                      </svg>
                                      View Items
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : selectedOrder && orderDetailsView ? (
                  <>
                    <div className="detail-header">
                      <button className="back-button" onClick={backToOrdersList}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Orders
                      </button>
                    </div>
                    
                    <div className="order-detail-header">
                      <h3>Order {selectedOrder.id}</h3>
                      <div className="order-meta">
                        <div className="order-date">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          <span>{formatDate(selectedOrder.date)}</span>
                        </div>
                        <div className="order-status-indicator">
                          <span className={`order-status ${getOrderStatusClass(selectedOrder.status)}`}>
                            {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="medicine-list-section">
                      <h4>Medications</h4>
                      <div className="medicine-table-wrapper">
                        <table className="medicine-table">
                          <thead>
                            <tr>
                              <th>Medication</th>
                              <th>Strength</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.items.map((item, index) => (
                              <tr key={index}>
                                <td className="medicine-name">{item.name}</td>
                                <td className="medicine-strength">{item.strength}</td>
                                <td className="medicine-quantity">{item.quantity} units</td>
                                <td className="medicine-price">${item.price.toFixed(2)}</td>
                              </tr>
                            ))}
                            <tr className="total-row">
                              <td colSpan="3" className="total-label">Total Amount</td>
                              <td className="total-price">${selectedOrder.totalAmount.toFixed(2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="order-actions-footer">
                        <button className="action-button track">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <path d="M16 16h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-5"></path>
                            <path d="M12 15V3"></path>
                            <path d="M12 15a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
                          </svg>
                          Track Order
                        </button>
                        <button className="action-button repeat">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 2v6h-6"></path>
                            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                            <path d="M3 22v-6h6"></path>
                            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                          </svg>
                          Reorder
                        </button>
                        <button className="action-button download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          Download Receipt
                        </button>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'medical-records' && (
          <div className="medical-records-section">
            <div className="section-header">
              <h2>Medical Records</h2>
              <div className="section-actions">
                <div className="search-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search records..." 
                    value={recordSearchTerm}
                    onChange={(e) => setRecordSearchTerm(e.target.value)}
                  />
                </div>
                <div className="filter-options">
                  <select 
                    value={recordFilterCategory} 
                    onChange={(e) => setRecordFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                  </select>
                </div>
              </div>
            </div>
            
            {recordView === 'list' ? (
              <div className="records-container">
                <div className="records-table-wrapper">
                  <table className="records-table">
                    <thead>
                      <tr>
                        <th>Record ID</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMedicalRecords.length === 0 ? (
                        <tr className="no-records">
                          <td colSpan="7">No medical records found</td>
                        </tr>
                      ) : (
                        filteredMedicalRecords.map(record => (
                          <tr key={record.id}>
                            <td>{record.id}</td>
                            <td className="record-title">{record.title}</td>
                            <td>
                              <span className="record-category">{record.category}</span>
                            </td>
                            <td>{formatDate(record.date)}</td>
                            <td>{record.doctor}</td>
                            <td>
                              <span className={`record-status ${getRecordStatusClass(record.status)}`}>
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </span>
                            </td>
                            <td className="record-actions">
                              <button
                                className="action-btn view"
                                onClick={() => viewRecordDetail(record.id)}
                                title="View Details"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </button>
                              <button
                                className="action-btn download"
                                title="Download Report"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                  <polyline points="7 10 12 15 17 10"></polyline>
                                  <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                              </button>
                              <button
                                className="action-btn share"
                                title="Share Report"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="18" cy="5" r="3"></circle>
                                  <circle cx="6" cy="12" r="3"></circle>
                                  <circle cx="18" cy="19" r="3"></circle>
                                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="record-detail">
                {selectedRecord && (
                  <>
                    <div className="detail-header">
                      <button className="back-button" onClick={backToRecordsList}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Records
                      </button>
                      <div className="record-actions">
                        <button className="action-button download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          Download
                        </button>
                        <button className="action-button share">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                          </svg>
                          Share
                        </button>
                        <button className="action-button print">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 6 2 18 2 18 9"></polyline>
                            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                            <rect x="6" y="14" width="12" height="8"></rect>
                          </svg>
                          Print
                        </button>
                      </div>
                    </div>
                    
                    <div className="record-detail-content">
                      <div className="record-overview">
                        <div className="record-header-detail">
                          <h2>{selectedRecord.title}</h2>
                          <div className={`record-status-badge ${getRecordStatusClass(selectedRecord.status)}`}>
                            {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                          </div>
                        </div>
                        <div className="record-meta">
                          <div className="meta-item">
                            <span className="label">Record ID:</span>
                            <span className="value">{selectedRecord.id}</span>
                          </div>
                          <div className="meta-item">
                            <span className="label">Date:</span>
                            <span className="value">{formatDate(selectedRecord.date)}</span>
                          </div>
                          <div className="meta-item">
                            <span className="label">Category:</span>
                            <span className="value">{selectedRecord.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="record-sections">
                        <div className="record-section doctor-hospital">
                          <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Medical Provider
                          </h3>
                          <div className="provider-details">
                            <div className="provider-doctor">
                              <div className="label">Doctor:</div>
                              <div className="value">{selectedRecord.doctor}</div>
                            </div>
                            <div className="provider-hospital">
                              <div className="label">Facility:</div>
                              <div className="value">{selectedRecord.hospital}</div>
                            </div>
                          </div>
                        </div>

                        <div className="record-section notes">
                          <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <path d="M14 2v6h6"></path>
                              <path d="M16 13H8"></path>
                              <path d="M16 17H8"></path>
                              <path d="M10 9H8"></path>
                            </svg>
                            Notes & Observations
                          </h3>
                          <div className="notes-content">
                            {selectedRecord.notes}
                          </div>
                        </div>

                        <div className="record-section results">
                          <h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                            </svg>
                            Test Results
                          </h3>
                          <div className="results-placeholder">
                            <p>Detailed test results would be displayed here. This would include charts, graphs, and specific measurements relevant to this particular medical test.</p>
                            
                            <div className="result-visual-placeholder">
                              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <line x1="12" y1="2" x2="12" y2="22"></line>
                              </svg>
                              <span>Result Visualization</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'profile' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Patient Profile</h2>
              <div className="section-actions">
                {!isEditingProfile ? (
                  <button className="primary-button" onClick={handleEditProfile}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button className="secondary-button" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                    <button className="primary-button" onClick={handleSaveProfile}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="profile-content">
              <div className="profile-sidebar">
                <div className="patient-avatar">
                  <div className="avatar-image">
                    <span>JD</span>
                  </div>
                  <h3>{profileData.personal.firstName} {profileData.personal.lastName}</h3>
                  <div className="patient-id">Patient ID: #12345</div>
                </div>
                
                <div className="profile-summary">
                  <div className="summary-item">
                    <div className="summary-label">Age</div>
                    <div className="summary-value">{calculateAge(profileData.personal.dateOfBirth)} years</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">Blood Type</div>
                    <div className="summary-value blood-type">{profileData.personal.bloodType}</div>
                  </div>
                  <div className="summary-item">
                    <div className="summary-label">BMI</div>
                    <div className="summary-value" style={{ color: getBMICategory(calculateBMI(profileData.personal.weight, profileData.personal.height)).color }}>
                      {calculateBMI(profileData.personal.weight, profileData.personal.height)} 
                      <span className="bmi-category">
                        ({getBMICategory(calculateBMI(profileData.personal.weight, profileData.personal.height)).category})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="profile-tabs">
                  <div 
                    className={`profile-tab ${activeProfileTab === 'personal' ? 'active' : ''}`}
                    onClick={() => setActiveProfileTab('personal')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Personal Information
                  </div>
                  <div 
                    className={`profile-tab ${activeProfileTab === 'medical' ? 'active' : ''}`}
                    onClick={() => setActiveProfileTab('medical')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      <path d="M12 11h.01"></path>
                      <path d="M12 16h.01"></path>
                    </svg>
                    Medical Information
                  </div>
                  <div 
                    className={`profile-tab ${activeProfileTab === 'insurance' ? 'active' : ''}`}
                    onClick={() => setActiveProfileTab('insurance')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Insurance Details
                  </div>
                  <div 
                    className={`profile-tab ${activeProfileTab === 'emergency' ? 'active' : ''}`}
                    onClick={() => setActiveProfileTab('emergency')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Emergency Contacts
          </div>
        </div>
      </div>
      
      <div className="profile-details">
        {activeProfileTab === 'personal' && (
          <div className="profile-tab-content">
            <h3 className="tab-title">Personal Information</h3>
            
            {!isEditingProfile ? (
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">First Name</div>
                  <div className="info-value">{profileData.personal.firstName}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Last Name</div>
                  <div className="info-value">{profileData.personal.lastName}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Gender</div>
                  <div className="info-value">{profileData.personal.gender}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Date of Birth</div>
                  <div className="info-value">{formatDate(profileData.personal.dateOfBirth)}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Height</div>
                  <div className="info-value">{profileData.personal.height} cm</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Weight</div>
                  <div className="info-value">{profileData.personal.weight} kg</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Phone Number</div>
                  <div className="info-value">{profileData.personal.phone}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Email</div>
                  <div className="info-value">{profileData.personal.email}</div>
                </div>
                <div className="info-item full-width">
                  <div className="info-label">Address</div>
                  <div className="info-value">{profileData.personal.address}</div>
                </div>
              </div>
            ) : (
              <div className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input 
                      type="text" 
                      value={editedProfileData.personal.firstName} 
                      onChange={(e) => handleProfileChange('personal', 'firstName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input 
                      type="text" 
                      value={editedProfileData.personal.lastName} 
                      onChange={(e) => handleProfileChange('personal', 'lastName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Gender</label>
                    <select 
                      value={editedProfileData.personal.gender} 
                      onChange={(e) => handleProfileChange('personal', 'gender', e.target.value)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input 
                      type="date" 
                      value={editedProfileData.personal.dateOfBirth} 
                      onChange={(e) => handleProfileChange('personal', 'dateOfBirth', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Blood Type</label>
                    <select 
                      value={editedProfileData.personal.bloodType} 
                      onChange={(e) => handleProfileChange('personal', 'bloodType', e.target.value)}
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input 
                      type="number" 
                      value={editedProfileData.personal.height} 
                      onChange={(e) => handleProfileChange('personal', 'height', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input 
                      type="number" 
                      value={editedProfileData.personal.weight} 
                      onChange={(e) => handleProfileChange('personal', 'weight', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      value={editedProfileData.personal.phone} 
                      onChange={(e) => handleProfileChange('personal', 'phone', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={editedProfileData.personal.email} 
                      onChange={(e) => handleProfileChange('personal', 'email', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Address</label>
                    <textarea 
                      value={editedProfileData.personal.address} 
                      onChange={(e) => handleProfileChange('personal', 'address', e.target.value)}
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeProfileTab === 'medical' && (
          <div className="profile-tab-content">
            <h3 className="tab-title">Medical Information</h3>
            
            {!isEditingProfile ? (
              <div className="medical-info">
                <div className="medical-section">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                      <circle cx="20" cy="8" r="2"></circle>
                      <path d="M19 12v1"></path>
                    </svg>
                    Allergies
                  </h4>
                  {profileData.medical.allergies.length > 0 ? (
                    <ul className="tags-list">
                      {profileData.medical.allergies.map((allergy, index) => (
                        <li key={index} className="tag danger">{allergy}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-data">No known allergies</p>
                  )}
                </div>
                
                <div className="medical-section">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 19h8a4 4 0 0 0 4-4 7 7 0 0 0-4-6.3 3 3 0 0 0-2.8-3.7 3 3 0 0 0-2.8 3.7 7 7 0 0 0-4 6.3 4 4 0 0 0 4 4z"></path>
                    </svg>
                    Chronic Conditions
                  </h4>
                  {profileData.medical.chronicConditions.length > 0 ? (
                    <ul className="tags-list">
                      {profileData.medical.chronicConditions.map((condition, index) => (
                        <li key={index} className="tag warning">{condition}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-data">No chronic conditions</p>
                  )}
                </div>
                
                <div className="medical-section">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    Current Medications
                  </h4>
                  {profileData.medical.medications.length > 0 ? (
                    <div className="med-list">
                      {profileData.medical.medications.map((med, index) => (
                        <div key={index} className="med-item">
                          <div className="med-name">{med.name}</div>
                          <div className="med-details">
                            <span className="med-dosage">{med.dosage}</span>
                            <span className="separator">•</span>
                            <span className="med-frequency">{med.frequency}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">No current medications</p>
                  )}
                </div>
                
                <div className="medical-section">
                  <h4>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                    Past Surgeries
                  </h4>
                  {profileData.medical.surgeries.length > 0 ? (
                    <div className="surgery-list">
                      {profileData.medical.surgeries.map((surgery, index) => (
                        <div key={index} className="surgery-item">
                          <div className="surgery-date">{formatDate(surgery.date)}</div>
                          <div className="surgery-details">
                            <div className="surgery-name">{surgery.procedure}</div>
                            <div className="surgery-hospital">{surgery.hospital}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">No surgical history</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="edit-form">
                <div className="form-section">
                  <label className="section-label">Allergies</label>
                  <div className="tags-editor">
                    {editedProfileData.medical.allergies.map((allergy, index) => (
                      <div key={index} className="tag-input-group">
                        <input 
                          type="text" 
                          value={allergy} 
                          onChange={(e) => {
                            const updatedAllergies = [...editedProfileData.medical.allergies];
                            updatedAllergies[index] = e.target.value;
                            handleProfileChange('medical', 'allergies', updatedAllergies);
                          }}
                        />
                        <button 
                          className="remove-btn"
                          onClick={() => {
                            const updatedAllergies = [...editedProfileData.medical.allergies];
                            updatedAllergies.splice(index, 1);
                            handleProfileChange('medical', 'allergies', updatedAllergies);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button 
                      className="add-btn"
                      onClick={() => {
                        const updatedAllergies = [...editedProfileData.medical.allergies, ''];
                        handleProfileChange('medical', 'allergies', updatedAllergies);
                      }}
                    >
                      Add Allergy
                    </button>
                  </div>
                </div>
                
                <div className="form-section">
                  <label className="section-label">Chronic Conditions</label>
                  <div className="tags-editor">
                    {editedProfileData.medical.chronicConditions.map((condition, index) => (
                      <div key={index} className="tag-input-group">
                        <input 
                          type="text" 
                          value={condition} 
                          onChange={(e) => {
                            const updatedConditions = [...editedProfileData.medical.chronicConditions];
                            updatedConditions[index] = e.target.value;
                            handleProfileChange('medical', 'chronicConditions', updatedConditions);
                          }}
                        />
                        <button 
                          className="remove-btn"
                          onClick={() => {
                            const updatedConditions = [...editedProfileData.medical.chronicConditions];
                            updatedConditions.splice(index, 1);
                            handleProfileChange('medical', 'chronicConditions', updatedConditions);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button 
                      className="add-btn"
                      onClick={() => {
                        const updatedConditions = [...editedProfileData.medical.chronicConditions, ''];
                        handleProfileChange('medical', 'chronicConditions', updatedConditions);
                      }}
                    >
                      Add Condition
                    </button>
                  </div>
                </div>
                
                <div className="form-section">
                  <label className="section-label">Current Medications</label>
                  {editedProfileData.medical.medications.map((med, index) => (
                    <div key={index} className="nested-form-row">
                      <div className="form-group">
                        <label>Medication Name</label>
                        <input 
                          type="text" 
                          value={med.name} 
                          onChange={(e) => handleNestedProfileChange('medical', 'medications', index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Dosage</label>
                        <input 
                          type="text" 
                          value={med.dosage} 
                          onChange={(e) => handleNestedProfileChange('medical', 'medications', index, 'dosage', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Frequency</label>
                        <input 
                          type="text" 
                          value={med.frequency} 
                          onChange={(e) => handleNestedProfileChange('medical', 'medications', index, 'frequency', e.target.value)}
                        />
                      </div>
                      <button 
                        className="remove-btn" 
                        onClick={() => {
                          const updatedMeds = [...editedProfileData.medical.medications];
                          updatedMeds.splice(index, 1);
                          handleProfileChange('medical', 'medications', updatedMeds);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button 
                    className="add-btn"
                    onClick={() => {
                      const updatedMeds = [...editedProfileData.medical.medications, { name: '', dosage: '', frequency: '' }];
                      handleProfileChange('medical', 'medications', updatedMeds);
                    }}
                  >
                    Add Medication
                  </button>
                </div>
                
                <div className="form-section">
                  <label className="section-label">Past Surgeries</label>
                  {editedProfileData.medical.surgeries.map((surgery, index) => (
                    <div key={index} className="nested-form-row">
                      <div className="form-group">
                        <label>Procedure</label>
                        <input 
                          type="text" 
                          value={surgery.procedure} 
                          onChange={(e) => handleNestedProfileChange('medical', 'surgeries', index, 'procedure', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input 
                          type="date" 
                          value={surgery.date} 
                          onChange={(e) => handleNestedProfileChange('medical', 'surgeries', index, 'date', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Hospital</label>
                        <input 
                          type="text" 
                          value={surgery.hospital} 
                          onChange={(e) => handleNestedProfileChange('medical', 'surgeries', index, 'hospital', e.target.value)}
                        />
                      </div>
                      <button 
                        className="remove-btn" 
                        onClick={() => {
                          const updatedSurgeries = [...editedProfileData.medical.surgeries];
                          updatedSurgeries.splice(index, 1);
                          handleProfileChange('medical', 'surgeries', updatedSurgeries);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button 
                    className="add-btn"
                    onClick={() => {
                      const updatedSurgeries = [...editedProfileData.medical.surgeries, { procedure: '', date: '', hospital: '' }];
                      handleProfileChange('medical', 'surgeries', updatedSurgeries);
                    }}
                  >
                    Add Surgery
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeProfileTab === 'insurance' && (
          <div className="profile-tab-content">
            <h3 className="tab-title">Insurance Details</h3>
            
            {!isEditingProfile ? (
              <div className="insurance-info">
                <div className="insurance-card">
                  <div className="insurance-header">
                    <div className="insurance-logo">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div className="insurance-provider">{profileData.insurance.provider}</div>
                    <div className="insurance-type">{profileData.insurance.coverageType} Plan</div>
                  </div>
                  <div className="insurance-details">
                    <div className="insurance-item">
                      <div className="label">Policy Number</div>
                      <div className="value">{profileData.insurance.policyNumber}</div>
                    </div>
                    <div className="insurance-item">
                      <div className="label">Group Number</div>
                      <div className="value">{profileData.insurance.groupNumber}</div>
                    </div>
                    <div className="insurance-item">
                      <div className="label">Coverage Type</div>
                      <div className="value">{profileData.insurance.coverageType}</div>
                    </div>
                    <div className="insurance-item">
                      <div className="label">Expiry Date</div>
                      <div className="value">{formatDate(profileData.insurance.expiryDate)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="edit-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Insurance Provider</label>
                    <input 
                      type="text" 
                      value={editedProfileData.insurance.provider} 
                      onChange={(e) => handleProfileChange('insurance', 'provider', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Coverage Type</label>
                    <select 
                      value={editedProfileData.insurance.coverageType} 
                      onChange={(e) => handleProfileChange('insurance', 'coverageType', e.target.value)}
                    >
                      <option value="Individual">Individual</option>
                      <option value="Family">Family</option>
                      <option value="Group">Group</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Policy Number</label>
                    <input 
                      type="text" 
                      value={editedProfileData.insurance.policyNumber} 
                      onChange={(e) => handleProfileChange('insurance', 'policyNumber', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Group Number</label>
                    <input 
                      type="text" 
                      value={editedProfileData.insurance.groupNumber} 
                      onChange={(e) => handleProfileChange('insurance', 'groupNumber', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input 
                      type="date" 
                      value={editedProfileData.insurance.expiryDate} 
                      onChange={(e) => handleProfileChange('insurance', 'expiryDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeProfileTab === 'emergency' && (
          <div className="profile-tab-content">
            <h3 className="tab-title">Emergency Contacts</h3>
            
            {!isEditingProfile ? (
              <div className="contacts-list">
                {profileData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-avatar">
                      <span>{contact.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="contact-info">
                      <div className="contact-name">{contact.name}</div>
                      <div className="contact-relationship">{contact.relationship}</div>
                      <div className="contact-phone">{contact.phone}</div>
                    </div>
                    <div className="contact-actions">
                      <button className="action-btn call" title="Call contact">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="edit-form">
                {editedProfileData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="form-section">
                    <div className="section-header">
                      <label className="section-label">Contact {index + 1}</label>
                      <button 
                        className="remove-btn" 
                        onClick={() => {
                          const updatedContacts = [...editedProfileData.emergencyContacts];
                          updatedContacts.splice(index, 1);
                          handleProfileChange('emergencyContacts', '', updatedContacts);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Name</label>
                        <input 
                          type="text" 
                          value={contact.name} 
                          onChange={(e) => handleNestedProfileChange('emergencyContacts', '', index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Relationship</label>
                        <input 
                          type="text" 
                          value={contact.relationship} 
                          onChange={(e) => handleNestedProfileChange('emergencyContacts', '', index, 'relationship', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone</label>
                        <input 
                          type="tel" 
                          value={contact.phone} 
                          onChange={(e) => handleNestedProfileChange('emergencyContacts', '', index, 'phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  className="add-btn"
                  onClick={() => {
                    const updatedContacts = [...editedProfileData.emergencyContacts, { name: '', relationship: '', phone: '' }];
                    handleProfileChange('emergencyContacts', '', updatedContacts);
                  }}
                >
                  Add Emergency Contact
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Dashboard; 