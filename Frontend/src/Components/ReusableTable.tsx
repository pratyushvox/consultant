
import {
    Table as ShadcnTable,
    TableBody,
    TableHeader,
} from "@/Components/ui/table"

import type {ReactNode} from "react"

type TableProps = {
    header: ReactNode;
    body : ReactNode;
};

const ReusableTable = ({header,body}: TableProps)=>{
    
    return(
        <div className="rounded-lg border bg-background">
            <ShadcnTable>
                <TableHeader>{header}</TableHeader>
                <TableBody>{body}</TableBody>

            </ShadcnTable>

        </div>

    )
}
export default ReusableTable 
