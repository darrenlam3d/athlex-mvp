
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import UserCard, { User } from '@/components/community/UserCard';
import ChatPanel from '@/components/community/ChatPanel';
import SearchFilters from '@/components/community/SearchFilters';
import { 
  getCurrentUser, 
  getUsers, 
  createConnectionRequest, 
  getMessages, 
  sendMessage 
} from '@/lib/communityService';
import { useToast } from "@/hooks/use-toast";
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Community = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPartner, setChatPartner] = useState<User | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const { toast: uiToast } = useToast();

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        
        const usersList = await getUsers();
        setUsers(usersList);
        setFilteredUsers(usersList);
      } catch (error) {
        console.error('Error loading data:', error);
        uiToast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load community data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Filter users when search or filters change
  useEffect(() => {
    if (!users.length) return;
    
    let result = [...users];
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(search)
      );
    }
    
    // Apply role filter
    if (selectedRole !== 'all') {
      result = result.filter(user => 
        user.id.startsWith(selectedRole)
      );
    }
    
    // Apply sport filter
    if (selectedSport !== 'all') {
      result = result.filter(user => 
        user.sport === selectedSport
      );
    }
    
    setFilteredUsers(result);
  }, [searchTerm, selectedRole, selectedSport, users]);
  
  // Handle connection request
  const handleConnect = async (userId: string) => {
    if (!currentUser) return;
    
    try {
      const success = await createConnectionRequest(currentUser.id, userId);
      
      if (success) {
        // Update local state to show pending status
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId ? { ...user, connection_status: 'pending' } : user
          )
        );
        
        toast.success("Connection request sent");
      }
    } catch (error) {
      console.error('Error connecting:', error);
      toast.error("Failed to send connection request");
    }
  };
  
  // Handle opening chat
  const handleOpenChat = async (userId: string) => {
    const partner = users.find(user => user.id === userId);
    if (!partner || !currentUser) return;
    
    setChatPartner(partner);
    
    try {
      const chatMessages = await getMessages(currentUser.id, userId);
      setMessages(chatMessages);
      setIsChatOpen(true);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error("Failed to load messages");
    }
  };
  
  // Handle sending a message
  const handleSendMessage = async (to: string, message: string) => {
    if (!currentUser) return;
    
    try {
      await sendMessage(currentUser.id, to, message);
      
      // Optimistically update messages list
      const newMessage = {
        from: currentUser.id,
        to,
        message,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen bg-athlex-background text-white">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <DashboardSidebar />
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-6">Community</h1>
              
              {/* Search & Filters */}
              <SearchFilters 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedRole={selectedRole}
                onRoleChange={setSelectedRole}
                selectedSport={selectedSport}
                onSportChange={setSelectedSport}
              />
              
              {/* User Directory */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-athlex-accent" />
                  <span className="ml-3 text-athlex-gray-400">Loading users...</span>
                </div>
              ) : filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUsers.map(user => (
                    <UserCard 
                      key={user.id}
                      user={user}
                      onConnect={handleConnect}
                      onOpenChat={handleOpenChat}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-athlex-gray-900 rounded-lg border border-athlex-gray-800">
                  <h3 className="text-xl font-medium text-athlex-gray-400">No users found</h3>
                  <p className="text-athlex-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Panel */}
          {currentUser && (
            <ChatPanel 
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              currentUser={currentUser}
              chatPartner={chatPartner}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Community;
