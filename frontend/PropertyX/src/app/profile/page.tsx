import { getWalletAddress } from "@/db/actions/wallet"
import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmptyWallet from "@/components/common/empty-wallet"

import Admin from "./admin"
import Assets from "./assets"
import ProfileInfo from "./profile-info"

const Page = async () => {
  const stxAddress = await getWalletAddress()
  return (
    <div className="container mx-auto max-w-5xl p-4 sm:p-6">
      <ProfileInfo />
      {stxAddress ? (
        <div className="mt-6">
          <Tabs defaultValue="assets">
            <TabsList>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="assets" className="mt-4">
              <Assets />
            </TabsContent>
            <TabsContent value="admin" className="mt-4">
              <Admin />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <EmptyWallet />
      )}
    </div>
  )
}

export default Page
