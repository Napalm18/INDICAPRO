import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/componets/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/componets/ui/avatar';
import { Wifi, WifiOff } from 'lucide-react';

function MonitoramentoTab() {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Simulação de usuários logados
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Seleciona aleatoriamente alguns usuários para estarem "online"
    const randomOnlineUsers = users.filter(() => Math.random() > 0.5);
    setOnlineUsers(randomOnlineUsers);
  }, []);

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Wifi />Usuários Online</CardTitle>
      </CardHeader>
      <CardContent>
        {onlineUsers.length > 0 ? (
          <div className="space-y-4">
            {onlineUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-2 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-500">
                  <Wifi size={16} />
                  <span>Online</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <WifiOff size={48} />
            <p className="mt-4">Nenhum usuário online no momento.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MonitoramentoTab;