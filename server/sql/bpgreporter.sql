USE [Cribmaster]
GO

/****** Object:  StoredProcedure [dbo].[bpGRNoReceivers]    Script Date: 11/22/2017 2:45:26 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

DECLARE @RC int
DECLARE @dtStart varchar(20)
DECLARE @dtEnd varchar(20)
Declare @startDateParam datetime
Declare @endDateParam datetime
set @dtStart = 'Nov 01 2017 00:00:00'
set @dtEnd = 'Nov 12 2017 00:00:00'
set @startDateParam = convert(datetime, @dtStart, 101)
set @endDateParam = convert(datetime, @dtEnd, 101)

EXECUTE @RC = [dbo].[bpGRNoReceivers] 
   @dtStart
  ,@dtEnd
GO

create procedure [dbo].[bpGRNoReceivers]
@dtStart varchar(20),
@dtEnd varchar(20)
as
begin
SET NOCOUNT ON
--Declare @dtStart varchar(20)
--Declare @dtEnd varchar(20)
--set @dtStart = '06-01-2016 10:15:10'
--set @dtEnd =  '12-05-2016 10:15:10'
Declare @dateStart datetime
Declare @dateEnd datetime
set @dateStart = CONVERT(datetime, @dtStart)
set @dateEnd = CONVERT(datetime, @dtEnd)
select po.VendorPO,pos.POStatusDescription,ven.VendorName,po.podate,pod.itemdescription,pod.Description2, pod.cribbin,quantity,pod.Received
from po 
inner join PODETAIL pod
on po.PONumber = pod.PONumber
inner join VENDOR ven
on po.Vendor=ven.VendorNumber
inner join postatus pos
on po.POStatusNo=pos.POStatusNo
where podate >= @dateStart
and podate <= @dateEnd
and received is null
and pos.POStatusNo=3 or pos.POStatusNo=0
and po.SITEID <> '90'
and (po.BLANKETPO = '' or po.BLANKETPO is null)
order by pos.POStatusDescription desc, pod.PONumber desc, pod.ItemDescription

end

GO


USE [m2mdata01]
GO

/****** Object:  StoredProcedure [dbo].[bpGRPOStatusRpt]    Script Date: 11/22/2017 7:25:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--//////////////////////////////////////////////////////////
-- For Ashley PO Status Report 
--////////////////////////////////////////////
create procedure [dbo].[bpGRPOStatusRpt]
@dtStart varchar(20),
@dtEnd varchar(20)
AS
BEGIN
--Declare @dtStart varchar(20)
--Declare @dtEnd varchar(20)
Declare @startDateParam datetime
Declare @endDateParam datetime
--set @dtStart = 'Jan 01 2017 00:00:00'
--set @dtEnd = 'Jan 12 2017 00:00:00'
set @startDateParam = convert(datetime, @dtStart, 101)
set @endDateParam = convert(datetime, @dtEnd, 101)
bpGRNoReceivers
select ncmp.fpono,pom.fcompany,pom.fcngdate,ncmp.fItemno,
RTRIM(LTRIM(pom.fstatus)) fstatus,ncmp.fpartno,ncmp.fordqty,ncmp.fqtyrecvSum,
case
	when fordqty <> fqtyrecvSum then 1
	else 0
end notComplete
from
(

	select poi.fpono,poi.fitemno,poi.fpartno,poi.fordqty,
	case
		when recv.fqtyrecvSum is null then 0.0
		else recv.fqtyrecvSum
	end fqtyrecvSum
	from
	(

 		-- get all the fpono(s) that we created receivers for
		-- and all their associated items and order quantities
		select dst.fpono,poi.fitemno,poi.fpartno,poi.fordqty
		from
		(
			select distinct pom.fpono 
			from rcmast rcm
			inner join pomast pom
			on rcm.fpono=pom.fpono
			where pom.fbuyer ='CM'
			and fdaterecv >= @startDateParam
			and fdaterecv <= @endDateParam
		)dst
		inner join poitem poi
		on dst.fpono=poi.fpono
		--order by rcm.fpono,poi.fitemno
		-- 180
	) poi
	left outer join
	(
		-- all items received for poitem 
		select fpono,fpoitemno,count(*) poitemCnt, sum(fqtyrecv) fqtyrecvSum
		from
		(
			/* start production */
			-- all the receivers for the fpono(s) we have received no matter the receiver number
			select rcm.fpono,rci.fpoitemno, rcm.freceiver,rci.fitemno rcvItemno,rci.fpartno,rci.fqtyrecv
			from 
			rcmast rcm
			inner join
			rcitem rci
			on rcm.freceiver=rci.freceiver
			where rcm.fpono in 
			(
				-- all the fpono we have received 
				select distinct pom.fpono 
				from rcmast rcm
				inner join pomast pom
				on rcm.fpono=pom.fpono
				where pom.fbuyer ='CM'
				and fdaterecv >= @startDateParam
				and fdaterecv <= @endDateParam
				--88
			)
			--185
		)api
		group by fpono,fpoitemno
		--order by fpono,fpoitemno
		--169
	) recv
	on
	poi.fpono=recv.fpono and
	poi.fitemno=recv.fpoitemno
	--order by poi.fpono,poi.fitemno
	--180
) ncmp
inner join pomast pom
on ncmp.fpono=pom.fpono
--inner join vendor ven
--on 
order by ncmp.fpono,ncmp.fitemno
end


set @dtStart = 'Jan 01 2017 00:00:00'
set @dtEnd = 'Jan 12 2017 00:00:00'
set @plantList = ',2,3,5,6,'
exec [dbo].[bpWorkSumPlantHTML] @dtStart,@dtEnd,@plantList

create procedure [dbo].[bpWorkSumPlantHTML]
@dtStart varchar(20),
@dtEnd varchar(20),
@plantList varchar(50)
AS
BEGIN
--Debug Only
--Declare @dtStart varchar(20)
--Declare @dtEnd varchar(20)
--Declare @plantList varchar(50)

--set @dtStart = 'Jan 01 2017 00:00:00'
--set @dtEnd = 'Jan 12 2017 00:00:00'
--set @plantList = ',2,3,5,'
--set @plantList = ',2,3,5,6,7,8,9,11'

Declare @startDateParam datetime
Declare @endDateParam datetime
set @startDateParam = convert(datetime, @dtStart, 101)
set @endDateParam = convert(datetime, @dtEnd, 101)
select *
from
(
	select 
	CASE fdept   
		WHEN '20' THEN '2'   
		WHEN '10' THEN '3'   
		WHEN '50' THEN '5'   
		WHEN '60' THEN '6'   
		WHEN '77' THEN '7'   
		WHEN '88' THEN '8'   
		WHEN '99' THEN '9'   
		WHEN '30' THEN '11'   
	END plant,
	*
	from
	(
		select * from  bfWorkSumLv6IJ(@startDateParam,@endDateParam)
		--where fdept in @dept  // tsql does not allow this https://stackoverflow.com/questions/5381727/tsql-variable-with-list-of-values-for-in-clause
	--	where CHARINDEX(','+fdept+',',@dept) > 0 
	) lv1
) lv2
where CHARINDEX(','+plant+',',@plantList) > 0 
order by plant,partNumber
END
GO



GO

USE [m2mdata01]
GO

/****** Object:  StoredProcedure [dbo].[bpWorkSumTransactions]    Script Date: 11/21/2017 8:46:45 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
Declare @dtStart varchar(20)
Declare @dtEnd varchar(20)
Declare @partNumber varchar(25)

set @dtStart = 'Jan 01 2017 00:00:00'
set @dtEnd = 'Jan 12 2017 00:00:00'
set @partNumber = '000 560 175 006'
exec [dbo].[bpWorkSumTransactionsHTML] @dtStart,@dtEnd,@partNumber

create procedure [dbo].[bpWorkSumTransactionsHTML]
@dtStart varchar(20),
@dtEnd varchar(20),
@partNumber varchar(25)
AS
BEGIN
--Debug Only
--Declare @dtStart varchar(20)
--Declare @dtEnd varchar(20)
--Declare @partNumber varchar(25)
--set @dtStart = 'Jan 01 2017 00:00:00'
--set @dtEnd = 'Jan 12 2017 00:00:00'
--set @partNumber = '000 560 175 006'

Declare @startDateParam datetime
Declare @endDateParam datetime
set @startDateParam = convert(datetime, @dtStart, 101)
set @endDateParam = convert(datetime, @dtEnd, 101)

select lv2.*,ti.description1
from
(
	select lv1.*,
	case
		when ipp.itemsPerPart is null then 0
		else 1
	end 
	as consumable
	from
	(
		select descript.partNumber, description, Plant, TranStartDateTime as transTime, itemNumber, qty, 
		cast(unitCost as decimal(18,2)) as unitCost, cast(qty*unitCost as decimal(18,2)) as totCost, userName  
		  from
		(
			select partNumber, description
			from btM2mPartJobInfo
			where partNumber=@partNumber 

		) as descript INNER JOIN
			 dbo.ToolingTransLog ON descript.partNumber = dbo.ToolingTransLog.PartNumber 
				where dbo.ToolingTransLog.[TranStartDateTime] >= @startDateParam 
				and dbo.ToolingTransLog.[TranStartDateTime] <= @endDateParam 
				--154653
		--153849
		--154027
	)lv1
	left outer join
	--consumable items
	btToolListPartItems ipp
	on lv1.partNumber=ipp.partNumber and lv1.itemNumber=ipp.itemNumber
	--153849
) lv2
inner join
--consumable items
toolitems ti
on lv2.itemNumber=ti.itemNumber
order by lv2.partNumber, lv2.itemNumber,lv2.Transtime
--153846
END
GO





execute [dbo].[bpReindex]
create procedure [dbo].[bpReindex]
AS
BEGIN
	IF EXISTS(select * from sys.indexes where object_id = OBJECT_ID('ToolingTransLog') and name = 'TranStartDateTimeIndex')
		DROP INDEX ToolingTransLog.TranStartDateTimeIndex

	CREATE NONCLUSTERED INDEX TranStartDateTimeIndex
	ON [dbo].[ToolingTransLog] ([TranStartDateTime])
	INCLUDE ([PartNumber],[ItemNumber],[Qty],[UNITCOST])

	IF EXISTS(select * from sys.indexes where object_id = OBJECT_ID('ladetail') and name = 'ToolCostSummary')
		DROP INDEX ladetail.ToolCostSummary

	CREATE NONCLUSTERED INDEX ToolCostSummary
	ON [dbo].[ladetail] ([fstatus],[fcompqty],[fedatetime])
	INCLUDE ([fempno],[fjobno],[foperno])

	IF EXISTS(select * from sys.indexes where object_id = OBJECT_ID('btDistinctToolLists') and name = 'ToolCostSummary')
		DROP INDEX btDistinctToolLists.ToolCostSummary

	CREATE NONCLUSTERED INDEX ToolCostSummary
	ON [dbo].[btDistinctToolLists] ([PartNumber])
	INCLUDE ([CustPartFamily])

END
